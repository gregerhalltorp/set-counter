import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import { getLocalStorageState, saveStateToLocalStorage } from '../../localStorage';
import loginSaga from '../sagas/loginSaga';
import logoutSaga from '../sagas/logoutSaga';
import authStateChangedSaga from '../sagas/authStateChangedSaga';
import writeToDbSaga from '../sagas/writeToDbSaga';
import valueIn from '../../utils/valueIn';

const observeStore = (store) => {
  let currentExercises;

  const handleChange = () => {
    const nextState = store.getState();
    if (valueIn(nextState, 'exercises') !== currentExercises) {
      currentExercises = valueIn(nextState, 'exercises');
      saveStateToLocalStorage(store.getState());
    }
    // Dispatch the action here
  };

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};

const makeStore = () => {
  const localData = getLocalStorageState();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, localData, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(loginSaga);
  sagaMiddleware.run(logoutSaga);
  sagaMiddleware.run(authStateChangedSaga);
  sagaMiddleware.run(writeToDbSaga);

  observeStore(store);

  return store;
};

export default makeStore;
