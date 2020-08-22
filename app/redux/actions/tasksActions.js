import { closeModal } from '../actions/modalAction';

export const tasksTypes = {
  FETCH_TASKS_REQUEST: 'FETCH_TASKS_REQUEST',
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_ERROR: 'FETCH_TASKS_ERROR',
  DELETE_TASK_START: 'DELETE_TASK_START',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  DELETE_TASK_ERROR: 'DELETE_TASK_ERROR',
  TASK_DONE_START: 'TASK_DONE_START',
  TASK_DONE_SUCCESS: 'TASK_DONE_SUCCESS',
  TASK_DONE_ERROR: 'TASK_DONE_ERROR',
  EDIT_TASK_START: 'EDIT_TASK_START',
  EDIT_TASK_SUCCESS: 'EDIT_TASK_SUCCESS',
  EDIT_TASK_ERROR: 'EDIT_TASK_ERROR',
  SEARCH_TASKS: 'SEARCH_TASKS',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
  COMPLETE_TASK_SUCCESS: 'COMPLETE_TASK_SUCCESS'
};

export const fetchTasksSuccess = ({ tasks, calendar }) => ({
  type: tasksTypes.FETCH_TASKS_SUCCESS,
  payload: {
    tasks,
    calendar
  }
});

export const fetchTasksError = error => ({
  type: tasksTypes.FETCH_TASKS_ERROR,
  payload: error.message
});

export const getUserTasks = () => ({
  type: tasksTypes.FETCH_TASKS_REQUEST,
  payload: {
    request: {
      method: 'GET',
      url: '/tasks'
    },

    options: {
      onSuccess({ dispatch, response }) {
        dispatch(fetchTasksSuccess(response.data));
      },
      onError({ dispatch, error }) {
        dispatch(fetchTasksError(error));
      }
    }
  }
});

export const deleteTask = taskId => ({
  type: tasksTypes.DELETE_TASK_START,
  payload: {
    request: {
      method: 'DELETE',
      url: `/task/${taskId}`
    },

    options: {
      onSuccess({ dispatch, response }) {
        dispatch(deleteTaskSuccess(response.data.taskId));
        dispatch(closeModal());
      },
      onError({ dispatch, error }) {
        dispatch(deleteTaskError(error));
      }
    }
  }
});

export const deleteTaskStart = () => ({
  type: tasksTypes.DELETE_TASK_START,
  payload: true
});

export const deleteTaskSuccess = id => ({
  type: tasksTypes.DELETE_TASK_SUCCESS,
  payload: id
});

export const deleteTaskError = error => ({
  type: tasksTypes.DELETE_TASK_ERROR,
  payload: error.message
});

export const editTask = (data, taskId) => ({
  type: tasksTypes.EDIT_TASK_START,
  payload: {
    request: {
      method: 'PATCH',
      url: `/task/${taskId}`
    },

    options: {
      onSuccess({ dispatch, response }) {
        dispatch(editTaskSuccess(data, response.data.taskId));
      },
      onError({ dispatch, error }) {
        console.log(data);
        dispatch(editTaskError(error));
      }
    }
  }
});

export const editTaskStart = () => ({
  type: tasksTypes.EDIT_TASK_START,
  payload: true
});

export const editTaskSuccess = id => ({
  type: tasksTypes.EDIT_TASK_SUCCESS,
  payload: id
});

export const editTaskError = error => ({
  type: tasksTypes.EDIT_TASK_ERROR,
  payload: error.message
});

export const searchTasks = search => ({
  type: tasksTypes.SEARCH_TASKS,
  payload: search
});

export const clearSearch = () => ({
  type: tasksTypes.CLEAR_SEARCH,
  payload: ''
});

export const completeTask = (data, taskId) => dispatch => {
  const { sectionDate, taskDates } = data;

  const sectionDateString = new Date(sectionDate).toISOString();
  const getDay = taskDates.find(el => el.date === sectionDateString);

  console.log(getDay);

  const dataUpdate = {
    isComplete: true,
    taskDayId: getDay._id
  };

  dispatch({
    type: tasksTypes.EDIT_TASK_START,
    payload: {
      request: {
        method: 'PATCH',
        url: `/task/${taskId}`,
        data: dataUpdate
      },

      options: {
        onSuccess({ dispatch, response }) {
          dispatch(completeTaskSuccess(data, response.data));
        },
        onError({ dispatch, error }) {
          dispatch(editTaskError(error));
        }
      }
    }
  });
};

export const completeTaskSuccess = (data, id) => ({
  type: tasksTypes.COMPLETE_TASK_SUCCESS,
  payload: { data, id }
});
