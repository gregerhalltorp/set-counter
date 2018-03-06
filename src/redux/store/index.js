import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import { getLocalStorageState, saveStateToLocalStorage } from '../../utils/localStorage';
import loginSaga from '../sagas/loginSaga';
import logoutSaga from '../sagas/logoutSaga';
import authStateChangedSaga from '../sagas/authStateChangedSaga';

const makeStore = () => {
  const localData = getLocalStorageState();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, localData, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(loginSaga);
  sagaMiddleware.run(logoutSaga);
  sagaMiddleware.run(authStateChangedSaga);

  store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
  });

  return store;
};

export default makeStore;
