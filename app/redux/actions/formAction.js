export const formTypes = {
  ADD_TASK_FORM_REQUEST: 'ADD_TASK_FORM_REQUEST',
  ADD_TASK_FORM_SUCCESS: 'ADD_TASK_FORM_SUCCESS',
  ADD_TASK_FORM_LOADER: 'ADD_TASK_FORM_LOADER',
  ADD_TASK_FORM_ERROR: 'ADD_TASK_FORM_ERROR'
};

export const postTaskStart = bool => ({
  type: formTypes.ADD_TASK_FORM_LOADER,
  payload: bool
});

export const postTaskSuccess = task => ({
  type: formTypes.ADD_TASK_FORM_SUCCESS,
  payload: { task }
});
export const postTaskError = error => ({
  type: formTypes.ADD_TASK_FORM_ERROR,
  payload: error.message
});

export const addTask = data => ({
  type: formTypes.ADD_TASK_FORM_REQUEST,
  payload: {
    request: {
      method: 'POST',
      url: '/tasks',
      data
    },

    options: {
      onSuccess({ dispatch, response }) {
        dispatch(postTaskSuccess(response.data.task));
      },
      onError({ dispatch, error }) {
        dispatch(postTaskError(error));
      }
    }
  }
});
