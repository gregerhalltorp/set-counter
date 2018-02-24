import { createStore } from 'redux';

import rootReducer from '../reducers';

const makeStore = (initialState = {}) => {
  const store = createStore(rootReducer);
  return store;
};

export default makeStore;
