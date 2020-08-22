import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { sessionReducer } from './reducers/sessionReducer';
import { tasksReducer } from './reducers/tasksReducer';
import { formReducer } from './reducers/formReducer';
import { modalReducer } from './reducers/modalReducer';
import { idEditReducer } from './reducers/getIdEditTask';

const sessionPersistConfig = {
  key: 'session',
  storage
};

const rootReducer = combineReducers({
  session: persistReducer(sessionPersistConfig, sessionReducer),
  userTasks: tasksReducer,
  form: formReducer,
  modal: modalReducer,
  id: idEditReducer
});

export default rootReducer;
