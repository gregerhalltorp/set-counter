import valueIn from '../utils/valueIn';

const dateReviver = (key, value) => (~key.toLowerCase().indexOf('date') ? new Date(value) : value);

export const getLocalStorageState = () => {
  try {
    const stoStateStr = window.localStorage && window.localStorage.getItem('setCounter');
    if (stoStateStr === null) {
      return undefined;
    }

    const state = JSON.parse(stoStateStr, dateReviver);
    if (valueIn(state, 'exercises')) {
      state.exercises.forEach((e) => {
        delete e.lastUpdated;
      });
      delete state.lastUpdatedDate;
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
