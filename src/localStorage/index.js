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
  if (!exercises) {
    return null;
  }
  if (exercises.constructor !== Array) {
    return exercises;
  }

  const excObj = {};
  exercises.forEach((e) => {
    const newExercise = {};
    Object.keys(e).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(e, key)) {
        if (key !== 'sets' && key !== 'id') {
          newExercise[key] = e[key];
        }
      }
    });
    newExercise.sets = {};
    e.sets.forEach((set) => {
      newExercise.sets[uuid()] = set;
    });

    excObj[uuid()] = newExercise;
  });
  return excObj;
};

export const getLocalStorageState = () => {
  try {
    const stoStateStr = window.localStorage && window.localStorage.getItem('setCounter');
    if (stoStateStr === null) {
      return undefined;
    }

    const state = JSON.parse(stoStateStr, dateReviver);
    if (valueIn(state, 'exercises.exercises')) {
      return state;
    }
    const oldExercises = valueIn(state, 'exercises');
    const exercises = fixExerciseState(oldExercises);

    return { exercises: { exercises } };
  } catch (err) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (state) => {
  // console.log('saving to localstorage');
  try {
    const serializedState = JSON.stringify({ exercises: valueIn(state, 'exercises') });
    localStorage.setItem('setCounter', serializedState);
  } catch (err) {
    // Do nothing for now
  }
};
