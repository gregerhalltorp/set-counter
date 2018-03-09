import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import authStateChangedSaga from '../sagas/authStateChangedSaga';
import loginSaga from '../sagas/loginSaga';
import logoutSaga from '../sagas/logoutSaga';
import rootReducer from '../reducers';
import syncToDbSaga from '../sagas/syncToDbSaga';

import { getLocalStorageState, saveStateToLocalStorage } from '../../localStorage';
import { syncToDatabase } from '../actions';
import { selectExerciseState, selectExercisesSynced } from '../selectors/exercisesSelectors';

const observeStore = (store) => {
  let currentExercises;

  const handleChange = () => {
    const nextState = store.getState();
    const exerciseState = selectExerciseState(nextState);
    console.log('exerciseState', exerciseState);
    console.log('currentExercises', currentExercises);
    console.log('exerciseState !== currentExercises', exerciseState !== currentExercises);

    if (currentExercises === undefined) {
      currentExercises = exerciseState;
    } else if (exerciseState !== currentExercises) {
      currentExercises = exerciseState;
      saveStateToLocalStorage(nextState);
      if (selectExercisesSynced(nextState) === false) {
        console.log('observestore dispatching');
        store.dispatch(syncToDatabase());
      }
    }
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
  sagaMiddleware.run(syncToDbSaga);

  observeStore(store);

  return store;
};

export default makeStore;
