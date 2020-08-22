export const idAction = {
  GET_TASK_ID: 'GET_TASK_ID'
};

export const getIdSuccess = id => ({ type: idAction.GET_TASK_ID, payload: id });
