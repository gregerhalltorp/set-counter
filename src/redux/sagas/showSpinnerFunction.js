import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { setCallIsSlow } from '../actions/';

function* showSpinner() {
  yield delay(300);
  yield put(setCallIsSlow());
}

export default showSpinner;
