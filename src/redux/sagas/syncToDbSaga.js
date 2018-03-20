import { put, select, takeEvery } from 'redux-saga/effects';

import * as ACTIONS from '../actions/actions';
import tryCatchSaga from '../../utils/tryCatchSaga';

import { databaseSynced } from '../actions';
import { fs } from '../../firebase';
import { selectExercises, selectDebtUpdatedDate } from '../selectors/exercisesSelectors';
import { selectUid } from '../selectors/appSelectors';

export function* syncToDatabase() {
  const exercises = yield select(selectExercises);
  const uid = yield select(selectUid);
  const debtUpdatedDate = yield select(selectDebtUpdatedDate);

  if (!exercises || !uid) {
    /* eslint-disable no-console */
    if (!exercises) {
      yield console.log('no exercises');
    } else {
      yield console.log('no uid');
    }
    /* eslint-enable no-console */
    return;
  }

  // yield console.log('saving to db', uid, exercises);
  const data = { uid, exercises };
  if (debtUpdatedDate) {
    data.debtUpdatedDate = debtUpdatedDate;
  }

  const { err } = yield tryCatchSaga(() => fs.setUserExercises(data));

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
