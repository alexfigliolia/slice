import { Component } from 'react';
import { connect } from 'react-redux';
import Task from 'Components/Task';
import './_Member.scss';

class Member extends Component {

  shouldComponentUpdate({ points, tasks }) {
    const curProps = this.props;
    if (points !== curProps.points) return true;
    else if (tasks.length !== curProps.tasks.length) return true;
    return false;
  }

  render() {
    const { name, points, color, tasks } = this.props;
    return (
      <div className='viz-member'>
        <div className='vm-info'>
          <div className='viz-name'>
            <div
              className='viz-color'
              style={{ backgroundColor: color }} />
            {name}
          </div>
          <div className='viz-cap'>{points} points</div>
        </div>
        <div className='vm-tasks'>
          {
            tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  {...task}
                  Tag='div'
                  ChildTag='div'
                  className='active-task' />
              );
            })
          }
        </div>
      </div>
    )
  }
}

const mSTP = ({ Backlog }, { name }) => {
  const tasks = Backlog.tasks.filter(t => t.assignee === name);
  return { tasks, points: tasks.reduce((acc, cur) => acc + cur.points, 0) };
}

export default connect(mSTP)(Member);