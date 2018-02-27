import { combineReducers } from 'redux';

import appReducer from './appReducer';
import exercisesReducer from './exercisesReducer';

const rootReducer = combineReducers({
  app: appReducer,
  exercises: exercisesReducer,
});

export default rootReducer;
