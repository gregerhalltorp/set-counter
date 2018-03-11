import uuid from 'uuid/v4';

import * as ACTIONS from '../actions/actions';
import { dateReviver } from '../../utils';

export const initialState = {
  isSynced: true,
  lastUpdatedDate: new Date(0),
  exercises: {
    [uuid()]: {
      name: 'Armhävningar',
      sets: {},
      reps: 25,
      lastUpdatedDate: new Date(0),
    },
  },
};

const updateExerciseFunction = (state, action) => {
  const { exerciseId } = action.data;
  if (!exerciseId) {
    return state;
  }
  const newState = JSON.parse(JSON.stringify(state), dateReviver);
  newState.isSynced = false;
  newState.lastUpdatedDate = new Date();

  const exercise = newState.exercises[exerciseId];
  exercise.sets[uuid()] = { reps: exercise.reps, date: new Date() };
  exercise.lastUpdatedDate = new Date();

  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_EXERCISE:
      return updateExerciseFunction(state, action);
    case ACTIONS.DATABASE_SYNCED:
      return {
        ...state,
        isSynced: true,
      };
    case ACTIONS.BATCH_ADD_EXERCISES:
      return {
        ...state,
        lastUpdatedDate: new Date(),
        isSynced: !action.data.shouldSync,
        exercises: action.data.exercises,
      };
    default:
      return state;
  }
};
