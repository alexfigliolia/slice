import Update from 'immutability-helper';
import { getTaskByID } from 'Modules/Helpers';

const initialState = {
  tasks: [
    {
      id: 'PROD-33',
      type: 'TASK',
      summary: 'Create some dialogue for the video',
      priority: 'HIGH',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'PROD-23',
      type: 'TASK',
      summary: 'Create the video',
      priority: 'HIGH',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'PROD-11',
      type: 'STORY',
      summary: 'Put together some documentation for the project',
      priority: 'MEDIUM',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'PROD-4',
      type: 'TASK',
      summary: 'Sync with teammembers',
      priority: 'LOW',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'ADM-48',
      type: 'STORY',
      summary: 'Create a pitch deck',
      priority: 'HIGH',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'ADM-87',
      type: 'STORY',
      summary: 'Create a pitch deck',
      priority: 'HIGH',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'EN-123',
      type: 'TASK',
      summary: 'Get a prototype out for shipit',
      priority: 'HIGH',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'EN-165',
      type: 'BUG',
      summary: 'Fix the backlog table',
      priority: 'MEDIUM',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'EN-132',
      type: 'TASK',
      summary: 'Create some test datasets',
      priority: 'LOW',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'EN-654',
      type: 'TASK',
      summary: 'Create a data-driven graph',
      priority: 'MEDIUM',
      assignee: '',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
  ],
  draggable: false,
  cloneX: 0,
  cloneY: 0,
  cloneOffset: 0,
  cloneWidth: 0,
  activeTaskID: 0,
}

const Backlog = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_TASK_POINTS': {
      const { index, points } = action;
      return Object.assign({}, state, { tasks: Update(state.tasks, { [index]: { points: { $set: Math.max(0, points) } } }) });
    }
    case 'SET_DRAGGABLE_TASK_LOCATION': {
      const { x, y } = action;
      return Object.assign({}, state, { cloneX: x, cloneY: y });
    }
    case 'SET_DRAGGABLE': {
      const { width, offsetX, taskID } = action;
      return Object.assign({}, state, {
        cloneWidth: width,
        draggable: true,
        cloneOffset: offsetX,
        activeTaskID: taskID,
      });
    }
    case 'END_DRAG':
      return Object.assign({}, state, { draggable: false, clone: {} });
    case 'UPDATE_ACTIVE_TASK': {
      const { tasks, activeTaskID } = state;
      const idx = getTaskByID(tasks, activeTaskID);
      if (idx === null) return state;
      return Object.assign({}, state, { tasks: Update(tasks, { [idx]: { $set: action.task } }) });
    }
    case 'UNASSIGN_ACTIVE_TASK': {
      const { tasks, activeTaskID } = state;
      const idx = getTaskByID(tasks, activeTaskID);
      if (idx === null) return state;
      return Object.assign(
        {},
        state,
        { tasks: Update(tasks, { [idx]: { assignee: { $set: '' } } }) }
      );
    }
    default:
      return state;
  }
}

export default Backlog;