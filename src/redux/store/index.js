import { createStore } from 'redux';

import rootReducer from '../reducers';
import { getLocalStorageState, saveStateToLocalStorage } from '../../utils/localStorage';

const makeStore = () => {
  const localData = getLocalStorageState();

  const store = createStore(rootReducer, localData);

  store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
  });

  return store;
};

export default makeStore;
