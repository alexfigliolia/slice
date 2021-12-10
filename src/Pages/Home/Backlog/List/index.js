import { Component } from 'react';
import { connect } from 'react-redux';
import Task from './Task';
import './_List.scss';

class List extends Component {

  static defaultProps = {
    tasks: []
  }

  render() {
    return (
      <div className='backlogged-items'>
        <table>
          <thead>
            <tr>
              <th>T</th>
              <th>Key</th>
              <th>P</th>
              <th>Summary</th>
              <th>Assignee</th>
              <th>Story Points</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.tasks.map((task, i) => {
                return (
                  <Task
                    key={task.id}
                    index={i}
                    {...task} />
                );
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mSTP = ({ Backlog }) => {
  return { tasks: Backlog.tasks };
}

export default connect(mSTP)(List);
