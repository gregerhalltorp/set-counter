import * as ACTIONS from '../actions/actions';

export const initialState = {
  lastUpdatedDate: new Date(),
  loginPending: false,
  logoutPending: false,
  loginError: false,
  logoutError: false,
  callIsSlow: false,
  authUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_EXERCISE:
      return {
        ...state,
        lastUpdatedDate: new Date(),
      };
    case ACTIONS.SET_LOGIN_PENDING:
      console.log('Log in pending');
      return { ...state, loginPending: true };
    case ACTIONS.SET_LOGOUT_PENDING:
      console.log('Log out pending');
      return { ...state, logoutPending: true };
    case ACTIONS.SET_CALL_IS_SLOW:
      return { ...state, callIsSlow: true };
    case ACTIONS.SET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginPending: false,
        callIsSlow: false,
        loginError: false,
      };
    }
    case ACTIONS.SET_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutPending: false,
        callIsSlow: false,
        logoutnError: false,
      };
    }
    case ACTIONS.SET_LOGIN_ERROR:
      console.log('Log in failed', action.data);
      return {
        ...state,
        loginPending: false,
        callIsSlow: false,
        loginError: action.data.err,
      };
    case ACTIONS.SET_LOGOUT_ERROR:
      console.log('Log out failed', action.data);
      return {
        ...state,
        logoutPending: false,
        callIsSlow: false,
        logoutError: action.data.err,
      };
    case ACTIONS.UPDATE_AUTH_STATE:
      return {
        ...state,
        authUser: action.data.authUser,
      };
    case ACTIONS.DATABASE_SYNCED:
      return {
        ...state,
        isSynced: true,
      };
    default:
      return state;
  }
};
