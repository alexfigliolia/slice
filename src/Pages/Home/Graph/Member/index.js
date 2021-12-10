import { Component } from 'react';
import { connect } from 'react-redux';
import './_Member.scss';

class Member extends Component {

  shouldComponentUpdate({ points }) {
    return points !== this.props.points;
  }

  render() {
    const { name, points, color } = this.props;
    return (
      <div className='viz-member'>
        <div className='viz-name'>
          <div
            className='viz-color'
            style={{ backgroundColor: color }} />
          {name}
        </div>
        <div className='viz-cap'>{points} points</div>
      </div>
    )
  }
}

const mSTP = ({ Backlog }, { name }) => {
  return { points: Backlog.tasks.filter(t => t.assignee === name).reduce((acc, cur) => acc + cur.points, 0) };
}

export default connect(mSTP)(Member);