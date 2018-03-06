import { select, takeLatest } from 'redux-saga/effects';

import * as ACTIONS from '../actions/actions';
import { fs } from '../../firebase';
import tryCatchSaga from '../../utils/tryCatchSaga';
import { selectExercises } from '../selectors/exercisesSelectors';

export function* authStateChangedFunction(action) {
  const exercises = yield select(selectExercises);
  yield console.log(action);
  if (!action.data.authUser) {
    return;
  }

  console.log('getting user');
  const { err, res } = yield tryCatchSaga(() => fs.getUser(action.data.authUser.uid));
  console.log('err', err);
  console.log('res', res);
  if (err) {
    // DO SOMETHING ELSE HERE, MAYBE PUT A THING?
  }
  const data = res.data();

  if (data.exercisesMap) {
    // DO SYNC STUFF HERE!
  }

  if (exercises) {
    // SAVE STATE TO DB HERE?
  }
}

export default function* authStateChangedSaga() {
  yield takeLatest(ACTIONS.AUTH_STATE_CHANGED, authStateChangedFunction);
}
