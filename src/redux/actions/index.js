import actionCreator from '../../utils/actionCreator';
import * as ACTIONS from './actions';

const createAction = actionCreator();

export const appDataLoaded = createAction(ACTIONS.APP_DATA_LOADED, {
  exercises: [],
  lastUpdatedDate: '',
});

export const clearStorage = createAction(ACTIONS.CLEAR_STORAGE, {});
export const updateExercise = createAction(ACTIONS.UPDATE_EXERCISE, { exercise: {} });
