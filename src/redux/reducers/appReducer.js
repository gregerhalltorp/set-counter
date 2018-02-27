import * as ACTIONS from '../actions/actions';

export const initialState = {
  lastUpdatedDate: new Date(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_EXERCISE:
      return {
        ...state,
        lastUpdatedDate: new Date(),
      };
    default:
      return state;
  }
};
