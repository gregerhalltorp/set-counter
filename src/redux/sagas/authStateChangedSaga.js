import { put, select, takeLatest } from 'redux-saga/effects';

import * as ACTIONS from '../actions/actions';
import { sendToDatabase, updateAuthState } from '../actions';
import { fs } from '../../firebase';
import tryCatchSaga from '../../utils/tryCatchSaga';
import { selectExercises } from '../selectors/exercisesSelectors';
import valueIn from '../../utils/valueIn';

// move some stuff to here!
export function* authStateChangedFunction(action) {
  const exercises = yield select(selectExercises);
  const uid = valueIn(action, 'data.authUser.uid');

  yield put(updateAuthState({ authUser: valueIn(action, 'data.authUser') }));

  if (!uid) {
    return;
  }

  const { err, res } = yield tryCatchSaga(() => fs.getUser(uid));
  if (err) {
    // DO SOMETHING ELSE HERE, MAYBE PUT A THING?
  }
  const data = res.data();

  // 0. No exercises, no exercisemap => do nothing now
  // 1. Exercises, No exercisesMap => write exercises to db
  // 2. No Exercises, exerciseMap => put action per exercise with exercise to write
  // 3. Exercises and exerciseMap => merge and then put
  // 2, 3 should be handled via store subscription, dispatch
  // 4. offline

  if (data.exercisesMap) {
    // DO SYNC STUFF HERE!
  }

  if (exercises) {
    yield put(sendToDatabase({ exercises, uid }));
  }
}

export default function* authStateChangedSaga() {
  yield takeLatest(ACTIONS.AUTH_STATE_CHANGED, authStateChangedFunction);
}
