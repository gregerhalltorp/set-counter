// import { createSelector } from 'reselect';

import valueIn from '../../utils/valueIn';

export const selectApp = state => valueIn(state, 'app');

export const selectLoginError = state => valueIn(state, 'app.loginError');

export const selectUser = state => valueIn(state, 'app.authUser');
export const selectUid = state => valueIn(state, 'app.authUser.uid');

export const selectLoginPending = state => valueIn(state, 'loginPending');
