import uuid from 'uuid/v4';

import * as ACTIONS from '../actions/actions';
import { dateReviver } from '../../utils';

export const initialState = {
  [uuid()]: {
    name: 'Armhävningar',
    sets: {},
    reps: 25,
    lastUpdatedDate: new Date(),
  },
};

const updateExerciseFunction = (state, action) => {
  const { exerciseId } = action.data;
  if (!exerciseId) {
    return state;
  }
  const newState = JSON.parse(JSON.stringify(state), dateReviver);
  const exercise = newState[exerciseId];
  exercise.sets[uuid()] = { reps: exercise.reps, date: new Date() };
  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_EXERCISE:
      return updateExerciseFunction(state, action);
    default:
      return state;
  }
};
