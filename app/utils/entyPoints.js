export const url = {
  loginUser: () => `/auth`,
  getTasks: () => `/tasks`,
  deleteTask: taskId => `/task/${taskId}`,
  updateTask: taskId => `/task/${taskId}`,
  addForm: () => `/tasks`
};
