import { Component } from 'react';
import { connect } from 'react-redux';
import { editTaskPoints, setDraggable, setDragLocation } from 'Actions/Backlog';
import TaskIcon from 'Icons/task.png';
import Bug from 'Icons/bug.png';
import Story from 'Icons/story.png';
import PHigh from 'Icons/pHigh.png';
import PMed from 'Icons/pMed.png';
import PLow from 'Icons/pLow.png';
import './_Task.scss';

class Task extends Component {
  constructor(props) {
    super(props);
    this.cloned = false;
    this.blur = this.blur.bind(this);
    this.listen = this.listen.bind(this);
    this.updatePoints = this.updatePoints.bind(this);
  }

  static defaultProps = {
    Tag: 'tr',
    ChildTag: 'td',
    id: '',
    type: '',
    summary: '',
    priority: 'LOW',
    assignee: '',
    points: 0,
    style: {}
  }

  // shouldComponentUpdate({ id, points }) {
  //   console.log(points);
  //   const curProps = this.props;
  //   if (id !== curProps.id) return true;
  //   else if (points !== curProps.points) return true;
  //   return false;
  // }

  enumType(type) {
    switch (type) {
      case 'STORY':
        return <img src={Story} alt='story' />
      case 'BUG':
        return <img src={Bug} alt='bug' />
      case 'TASK':
      default:
        return <img src={TaskIcon} alt='task' />
    }
  }

  enumPriority(priority) {
    switch (priority) {
      case 'HIGH':
        return <img src={PHigh} alt='high' />
      case 'MEDIUM':
        return <img src={PMed} alt='medium' />
      case 'LOW':
      default:
        return <img src={PLow} alt='low' />
    }
  }

  updatePoints(e) {
    const { editTaskPoints, index } = this.props;
    editTaskPoints(index, parseInt(e.target.value));
  }

  blur(e) {
    const { value } = e.target;
    if (value === '') {
      const { editTaskPoints, index } = this.props;
      editTaskPoints(index, 0);
    }
  }

  listen(e) {
    const {
      index,
      setDraggable,
      setDragLocation
    } = this.props;
    const { target, nativeEvent, pageX, pageY } = e;
    if (target.tagName === 'INPUT' || target.tagName === 'BUTTON') {
      return;
    }
    const tableRow = target.closest('tr');
    if (!!tableRow) {
      setDragLocation(pageX, pageY);
      setDraggable(
        tableRow.getBoundingClientRect().width,
        nativeEvent.offsetX,
        index
      )
    }
  }

  render() {
    const { Tag, ChildTag, id, type, summary, priority, assignee, points, className, style } = this.props;
    return (
      <Tag
        className={`backlog-item${className ? ` ${className}` : ''}`}
        onMouseDown={this.listen}
        style={style}>
        <ChildTag className='type'>{this.enumType(type)}</ChildTag>
        <ChildTag>{id}</ChildTag>
        <ChildTag className='priority'>{this.enumPriority(priority)}</ChildTag>
        <ChildTag>{summary}</ChildTag>
        <ChildTag className='assignee'>{assignee}</ChildTag>
        <ChildTag className='points'>
          <input
            type='number'
            value={points}
            onBlur={this.blur}
            onChange={this.updatePoints} />
        </ChildTag>
      </Tag>
    )
  }
}

export default connect(null, { editTaskPoints, setDraggable, setDragLocation })(Task);