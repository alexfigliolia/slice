import Update from 'immutability-helper';

const initialState = {
  tasks: [
    {
      id: 'PROD-33',
      type: 'TASK',
      summary: 'Create some dialogue for the video',
      priority: 'HIGH',
      assignee: 'Olga Gabris',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'PROD-23',
      type: 'TASK',
      summary: 'Create the video',
      priority: 'HIGH',
      assignee: 'Olga Gabris',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'PROD-11',
      type: 'STORY',
      summary: 'Put together some documentation for the project',
      priority: 'MEDIUM',
      assignee: 'Olga Gabris',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'PROD-4',
      type: 'TASK',
      summary: 'Sync with teammembers',
      priority: 'LOW',
      assignee: 'Olga Gabris',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'ADM-48',
      type: 'STORY',
      summary: 'Create a pitch deck',
      priority: 'HIGH',
      assignee: 'Belinda Rose',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'ADM-87',
      type: 'STORY',
      summary: 'Create a pitch deck',
      priority: 'HIGH',
      assignee: 'Belinda Rose',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'EN-123',
      type: 'TASK',
      summary: 'Get a prototype out for shipit',
      priority: 'HIGH',
      assignee: 'Alex Figliolia',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'EN-165',
      type: 'BUG',
      summary: 'Fix the backlog table',
      priority: 'MEDIUM',
      assignee: 'Alex Figliolia',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'EN-132',
      type: 'TASK',
      summary: 'Create some test datasets',
      priority: 'LOW',
      assignee: 'Alex Figliolia',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
    {
      id: 'EN-654',
      type: 'TASK',
      summary: 'Create a data-driven graph',
      priority: 'MEDIUM',
      assignee: 'Alex Figliolia',
      points: Math.floor(Math.random() * (5 - 1) + 1)
    },
  ],
  sprint: []
}

const Backlog = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_TASK_POINTS': {
      const { index, points } = action;
      return Object.assign({}, state, { tasks: Update(state.tasks, { [index]: { points: { $set: Math.max(0, points) } } }) });
    }
    case 'EDIT_SPRINT_TASK_POINTS': {
      const { index, points } = action;
      return Object.assign({}, state, { sprint: Update(state.sprint, { [index]: { points: { $set: Math.max(0, points) } } }) });
    }
    default:
      return state;
  }
}

export default Backlog;