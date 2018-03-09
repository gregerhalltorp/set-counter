import actionCreator from '../../utils/actionCreator';
import * as ACTIONS from './actions';

const createAction = actionCreator();

export const clearStorage = createAction(ACTIONS.CLEAR_STORAGE, {});
export const updateExercise = createAction(ACTIONS.UPDATE_EXERCISE, { exerciseId: {} });

export const doLogin = createAction(ACTIONS.PERFORM_LOGIN, {
  email: '',
  password: '',
  history: {},
});
export const doLogout = createAction(ACTIONS.PERFORM_LOGOUT, {
  history: {},
});
export const setLoginPending = createAction(ACTIONS.SET_LOGIN_PENDING, {});
export const setLogoutPending = createAction(ACTIONS.SET_LOGOUT_PENDING, {});
export const setLoginError = createAction(ACTIONS.SET_LOGIN_ERROR, { err: {} });
export const setLogoutError = createAction(ACTIONS.SET_LOGOUT_ERROR, { err: {} });
export const setLoginSuccess = createAction(ACTIONS.SET_LOGIN_SUCCESS, {});
export const setLogoutSuccess = createAction(ACTIONS.SET_LOGOUT_SUCCESS, {});
export const authStateChanged = createAction(ACTIONS.AUTH_STATE_CHANGED, { authUser: null });
export const updateAuthState = createAction(ACTIONS.UPDATE_AUTH_STATE, { authUser: null });

export const setCallIsSlow = createAction(ACTIONS.SET_CALL_IS_SLOW, {});

export const navigate = createAction(ACTIONS.NAVIGATE, { history: {}, route: '' });

export const syncToDatabase = createAction(ACTIONS.SYNC_TO_DB, { exercises: {}, uid: '' });
export const databaseSynced = createAction(ACTIONS.DATABASE_SYNCED, {});
