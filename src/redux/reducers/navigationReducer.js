import * as ACTIONS from '../actions/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.NAVIGATE:
      // eslint-disable-next-line no-unused-expressions
      action.data.history && action.data.history.push(action.data.route);
      return state;
    default:
      return state;
  }
};
