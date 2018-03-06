import { createSelector } from 'reselect';

import valueIn from '../../utils/valueIn';

export const selectApp = state => valueIn(state, 'app');

export const selectLoginError = createSelector([selectApp], app => valueIn(app, 'loginError'));
export const selectUser = createSelector([selectApp], app => valueIn(app, 'authUser'));
