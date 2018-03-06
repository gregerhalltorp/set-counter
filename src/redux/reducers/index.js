import { combineReducers } from 'redux';

import appReducer from './appReducer';
import exercisesReducer from './exercisesReducer';
import navigationReducer from './navigationReducer';

const rootReducer = combineReducers({
  app: appReducer,
  exercises: exercisesReducer,
  navigation: navigationReducer,
});

export default rootReducer;
