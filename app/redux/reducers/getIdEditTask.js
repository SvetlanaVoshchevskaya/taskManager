import { idAction } from '../actions/getIdAction';

const Initstate = '';

export const idEditReducer = (state = Initstate, { type, payload }) => {
  switch (type) {
    case idAction.GET_TASK_ID:
      return (state = payload);
    default:
      return state;
  }
};
