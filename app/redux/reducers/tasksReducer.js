import { tasksTypes } from '../actions/tasksActions';
import { formTypes } from '../actions/formAction';

const initialState = {
  tasks: null,
  calendar: null,
  loader: false,
  error: null,
  search: ''
};

export const tasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case tasksTypes.FETCH_TASKS_REQUEST:
      return { ...state, loader: true };
    case tasksTypes.FETCH_TASKS_SUCCESS:
      return { ...state, ...payload, loader: false };
    case tasksTypes.FETCH_TASKS_ERROR:
      return { ...state, error: payload, loader: false };
    case tasksTypes.DELETE_TASK_START:
      return { ...state, loader: payload };
    case tasksTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        loader: false,
        tasks: state.tasks.filter(el => el._id !== payload)
      };
    case tasksTypes.DELETE_TASK_ERROR:
      return { ...state, error: payload, loader: false };
    case tasksTypes.EDIT_TASK_START:
      return { ...state, loader: true };
    case tasksTypes.EDIT_TASK_SUCCESS:
      return {
        ...state,
        loader: false,
        tasks: state.tasks.find(el => el._id === payload)
      };
    case tasksTypes.EDIT_TASK_ERROR:
      return { ...state, error: payload, loader: false };
    case formTypes.ADD_TASK_FORM_SUCCESS:
      const newTask = payload.task;
      return { ...state, tasks: [newTask, ...state.tasks] };
    case tasksTypes.SEARCH_TASKS:
      return { ...state, search: payload };
    case tasksTypes.CLEAR_SEARCH:
      return { ...state, search: payload };
    case tasksTypes.COMPLETE_TASK_SUCCESS:
      console.log(payload);

      return {
        ...state,
        loader: false,
        tasks: state.tasks.map(el => {
          if (el._id === payload.id.taskId) {
            return {
              ...el,
              dates: el.dates.map(dat => {
                if (dat._id === payload.id.taskDayId) {
                  return { ...dat, isComplete: true };
                }
                return dat;
              })
            };
          }
          return el;
        })
      };

    default:
      return state;
  }
};
