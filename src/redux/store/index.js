import { createStore } from 'redux';

import rootReducer from '../reducers';

const makeStore = (fastLoadedState = {}) => {
  const store = createStore(rootReducer, fastLoadedState);
  return store;
};

export default makeStore;
