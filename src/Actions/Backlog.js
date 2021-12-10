export const editTaskPoints = (index, points) => {
  return { type: 'EDIT_TASK_POINTS', index, points };
}

export const editSprintTaskPoints = (index, points) => {
  return { type: 'EDIT_SPRINT_TASK_POINTS', index, points };
}