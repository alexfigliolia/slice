import { Component } from 'react';
import { connect } from 'react-redux';
import Grapher from 'Modules/Graph';
import ResizeObserver from 'Components/ResizeObserver';
import Member from './Member';
import './_Graph.scss';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.graph = null;
    this.width = null;
    this.colors = ['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c'];
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    const graphSize = Math.min(this.width * 0.8, 400);
    const graphPadding = graphSize * 0.1;
    this.graph = new Grapher({
      selector: '#pieTarget',
      width: graphSize,
      height: graphSize,
      paddingX: graphPadding,
      paddingY: graphPadding,
      type: 'PIE',
      colors: this.colors,
      data: Object.values(this.props.members)
    });
  }

  shouldComponentUpdate({ totalAssigned }) {
    return totalAssigned !== this.props.totalAssigned;
  }

  resize({ width }) {
    if (this.width !== width) {
      this.width = width;
      if (this.graph) {
        const graphSize = Math.min(this.width * 0.8, 400);
        const graphPadding = graphSize * 0.1;
        this.graph.resize({
          height: graphSize,
          width: graphSize,
          paddingX: graphPadding,
          paddingY: graphPadding,
        })
      }
    }
  }

  render() {
    const { members, totalAssigned } = this.props;
    return (
      <ResizeObserver
        checkHeight={false}
        className='viz graph'
        resize={this.resize}>
        <h2>Capacity Graph</h2>
        <div className='graph-container'>
          <svg
            id='pieTarget'
            ref={this.cacheReference} />
          <div className='graph-meta'>
            <h3>Assignee</h3>
            <p>Total Issues: {totalAssigned}</p>
            <div className='members'>
              {
                Object.keys(members).map((id, i) => {
                  return (
                    <Member
                      key={id}
                      color={this.colors[i]}
                      {...members[id]} />
                  );
                })
              }
            </div>
          </div>
        </div>
      </ResizeObserver>
    )
  }
}

const mSTP = ({ Team, Backlog }) => {
  return {
    members: Team.members,
    totalAssigned: Backlog.tasks.filter(t => t.assignee !== '').length
  };
}

export default connect(mSTP)(Graph);