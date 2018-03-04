import uuid from 'uuid/v4';

import valueIn from '../utils/valueIn';

const dateReviver = (key, value) => (~key.toLowerCase().indexOf('date') ? new Date(value) : value);

// removeOldUpdatedDates = (exercises) => {
// if (valueIn(state, 'exercises')) {
//   state.exercises.forEach((e) => {
//     delete e.lastUpdated;
//   });
//   delete state.lastUpdatedDate;
// }
// };

const fixExerciseState = (exercises) => {
  if (exercises.constructor !== Array) {
    return exercises;
  }

  const excObj = {};
  exercises.forEach((e) => {});
  console.log(uuid());
  return excObj;
};

export const getLocalStorageState = () => {
  try {
    const stoStateStr = window.localStorage && window.localStorage.getItem('setCounter');
    if (stoStateStr === null) {
      return undefined;
    }

    const state = JSON.parse(stoStateStr, dateReviver);
    const oldExercises = valueIn(state, 'exercises');
    if (oldExercises) {
      fixExerciseState(oldExercises);
    }

    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(valueIn(state));
    localStorage.setItem('setCounter', serializedState);
  } catch (err) {
    // Do nothing for now
  }
};
