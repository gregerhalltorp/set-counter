import valueIn from '../utils/valueIn';

const dateReviver = (key, value) => (~key.toLowerCase().indexOf('date') ? new Date(value) : value);

export const getLocalStorageState = () => {
  try {
    const stoStateStr = window.localStorage && window.localStorage.getItem('setCounter');
    if (stoStateStr === null) {
      return undefined;
    }

    return { app: JSON.parse(stoStateStr, dateReviver) };
  } catch (err) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(valueIn(state, 'app'));
    localStorage.setItem('setCounter', serializedState);
  } catch (err) {
    // Do nothing for now
  }
};
