import { cancel, fork, put, takeLatest } from 'redux-saga/effects';

import * as ACTIONS from '../actions/actions';
import * as ROUTES from '../../constants/routes';
import { setLogoutPending, setLogoutSuccess, setLogoutError, navigate } from '../actions';
import showSpinner from './showSpinnerFunction';
import tryCatchSaga from '../../utils/tryCatchSaga';
import { auth } from '../../firebase';

export function* logoutFunction(action) {
  const { history } = action.data;

  yield put(setLogoutPending());
  const spinner = yield fork(showSpinner);

  const { err } = yield tryCatchSaga(() => auth.doSignOut());
  yield cancel(spinner);

  if (err) {
    return yield put(setLogoutError({ err }));
  }
  yield put(setLogoutSuccess());
  return yield put(navigate({ history, route: ROUTES.LANDING }));
}

export default function* logoutSaga() {
  yield takeLatest(ACTIONS.PERFORM_LOGOUT, logoutFunction);
}
