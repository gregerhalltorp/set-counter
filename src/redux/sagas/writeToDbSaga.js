import { put, takeEvery } from 'redux-saga/effects';

import * as ACTIONS from '../actions/actions';
import { databaseSynced } from '../actions';
import valueIn from '../../utils/valueIn';
import tryCatchSaga from '../../utils/tryCatchSaga';
import { fs } from '../../firebase';

export function* writeToDabase(action) {
  if (!valueIn(action, 'data.exercises') || !valueIn(action, 'data.uid')) {
    return;
  }

  yield console.log('saving to db', action.data);

  let err;
  // const { err } = yield tryCatchSaga(() => fs.setUserExercises(action.data));

  if (err) {
    // put it on the state to show in a thing
  }

  if (!err) {
    yield put(databaseSynced());
  }
}

export default function* writeToDbSaga() {
  yield takeEvery(ACTIONS.SEND_TO_DB, writeToDabase);
}
