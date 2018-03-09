import { put, select, takeEvery } from 'redux-saga/effects';

import * as ACTIONS from '../actions/actions';
import tryCatchSaga from '../../utils/tryCatchSaga';
import valueIn from '../../utils/valueIn';

import { databaseSynced } from '../actions';
import { fs } from '../../firebase';
import { selectExercises } from '../selectors/exercisesSelectors';
import { selectUid } from '../selectors/appSelectors';

export function* syncToDatabase(action) {
  const exercises = yield select(selectExercises);
  const uid = yield select(selectUid);

  if (!exercises || !uid) {
    yield console.log('returning');
    return;
  }

  yield console.log('not really saving to db', uid, exercises);

  let err;
  // const { err } = yield tryCatchSaga(() => fs.setUserExercises(action.data));

  if (err) {
    // put it on the state to show in a thing
  }

  if (!err) {
    yield put(databaseSynced());
  }
}

export default function* syncToDbSaga() {
  yield takeEvery(ACTIONS.SYNC_TO_DB, syncToDatabase);
}
