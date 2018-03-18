import uuid from 'uuid/v4';

import * as ACTIONS from '../actions/actions';
import { dateReviver } from '../../utils';
import valueIn from '../../utils/valueIn';

// TODO: IMMUTABLE IS GOOD IN THIS KIND OF PROJECT!

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
  const debt = exercise.debt || 0;
  exercise.debt = debt - exercise.reps;

  return newState;
};

const newDayArrivedFunction = (state) => {
  // TODO: Also update reps and goal props here, depending on other stuff
  const now = new Date();
  const newState = JSON.parse(JSON.stringify(state), dateReviver);
  newState.isSynced = false;
  newState.lastUpdatedDate = now;
  newState.debtUpdatedDate = now;

  Object.keys(newState.exercises).forEach((key) => {
    const newDebt =
      (valueIn(newState, ['exercises', key, 'debt']) || 0) +
      (valueIn(newState, ['exercises', key, 'dailyGoal']) || 0);

    newState.exercises[key].debt = newDebt;
  });
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
    case ACTIONS.NEW_DAY_ARRIVED:
      return newDayArrivedFunction(state);
    default:
      return state;
  }
};
