export const getTaskByID = (tasks, id) => {
  let idx = null;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.id === id) {
      idx = i;
      break;
    }
  }
  return idx;
}