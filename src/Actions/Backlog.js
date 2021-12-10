export const editTaskPoints = (index, points) => {
  return { type: 'EDIT_TASK_POINTS', index, points };
}

export const setDragLocation = (x, y) => {
  return { type: 'SET_DRAGGABLE_TASK_LOCATION', x, y };
}

export const setDraggable = (width = 0, offsetX = 0, taskIndex) => {
  return { type: 'SET_DRAGGABLE', width, offsetX, taskIndex };
}

export const endDrag = () => {
  return { type: 'END_DRAG' };
}

export const attemptAddTask = (id) => (dispatch, getState) => {
  const int = parseInt(id);
  if (int != id) {
    return;
  }
  const { Team, Backlog } = getState();
  if (!(id in Team.members)) {
    return;
  }
  const { tasks, activeTaskIndex } = Backlog;
  const activeTask = tasks[activeTaskIndex];
  const { name, capacity } = Team.members[id];
  const capacityUsed = tasks.filter(t => t.assignee === name).reduce((acc, next) => acc + next.points, 0);
  if (capacity - (capacityUsed + activeTask.points) < 0) {
    return;
  }
  const task = {
    ...activeTask,
    assignee: name
  };
  dispatch({ type: 'UPDATE_ACTIVE_TASK', task });
}