import { cancel, fork, put, takeLatest } from 'redux-saga/effects';

import * as ACTIONS from '../actions/actions';
import * as ROUTES from '../../constants/routes';
import { setLoginPending, setLoginSuccess, setLoginError, navigate } from '../actions';
import showSpinner from './showSpinnerFunction';
import tryCatchSaga from '../../utils/tryCatchSaga';
import { auth } from '../../firebase';

export function* loginFunction(action) {
  const { email, password, history } = action.data;

  yield put(setLoginPending());
  const spinner = yield fork(showSpinner);

  const { err } = yield tryCatchSaga(() => auth.doSignInWithEmailAndPassword(email, password));
  yield cancel(spinner);

  if (err) {
    return yield put(setLoginError({ err }));
  }
  yield put(setLoginSuccess());
  return yield put(navigate({ history, route: ROUTES.LANDING }));
}

export default function* loginSaga() {
  yield takeLatest(ACTIONS.PERFORM_LOGIN, loginFunction);
}
