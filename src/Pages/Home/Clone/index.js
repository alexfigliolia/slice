import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDragLocation, endDrag, attemptAddTask, unassignTask } from 'Actions/Backlog';
import Task from 'Components/Task';
import { getTaskByID } from 'Modules/Helpers';
import './_Clone.scss';

class Clone extends Component {
  constructor(props) {
    super(props);
    this.drop = this.drop.bind(this);
    this.dragMove = this.dragMove.bind(this);
  }

  static defaultProps = {
    Tag: 'div',
    ChildTag: 'div',
    className: 'clone',
    id: 'ABC-123',
    type: 'STORY',
    priority: 'HIGH',
    summary: 'This is a story about things',
    assignee: 'Alex Figliolia',
    points: 12,
    style: {
      top: 0,
      left: 0
    }
  }

  UNSAFE_componentWillReceiveProps({ draggable }) {
    if (draggable !== this.props.draggable) {
      if (draggable) {
        document.addEventListener('mousemove', this.dragMove);
        document.addEventListener('mouseup', this.drop);
      } else {
        document.removeEventListener('mousemove', this.dragMove);
        document.removeEventListener('mouseup', this.drop);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.drop);
  }

  dragMove(e) {
    const { pageX, pageY } = e;
    this.props.setDragLocation(pageX, pageY);
  }

  drop(e) {
    const { attemptAddTask, endDrag, unassignTask } = this.props;
    const { target } = e;
    const closestTable = target.closest('table');
    if (!!closestTable) {
      unassignTask();
    }
    attemptAddTask(target.classList.value);
    endDrag();
  }

  render() {
    const {
      Tag,
      ChildTag,
      id,
      type,
      priority,
      summary,
      assignee,
      points,
      cloneY,
      cloneX,
      cloneWidth,
      cloneOffset,
      draggable,
    } = this.props;
    return (
      <Task
        Tag={Tag}
        ChildTag={ChildTag}
        className='clone'
        id={id}
        type={type}
        priority={priority}
        summary={summary}
        assignee={assignee}
        points={points}
        style={{
          opacity: draggable ? 1 : 0,
          position: 'absolute',
          top: cloneY,
          left: cloneX - (cloneOffset * 2),
          width: cloneWidth,
        }} />
    )
  }
}

const mSTP = ({ Backlog }) => {
  const { tasks, cloneX, cloneY, cloneWidth, draggable, cloneOffset, activeTaskID } = Backlog;
  let task = {};
  const idx = getTaskByID(tasks, activeTaskID);
  if (idx !== null) {
    task = tasks[idx];
  }
  return { ...task, cloneX, cloneY, cloneWidth, draggable, cloneOffset };
}

export default connect(mSTP, { setDragLocation, endDrag, attemptAddTask, unassignTask })(Clone);