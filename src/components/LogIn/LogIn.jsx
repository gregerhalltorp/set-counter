import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { connect } from '../../utils';
import LogInForm from './_LoginForm.jsx';
import { selectLoginError } from '../../redux/selectors/appSelectors';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  loginError: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
};

const defaultProps = {
  loginError: false,
};

const LogInDumb = ({ history, dispatch, loginError }) => {
  return (
    <div>
      <h1>Sign In</h1>
      <LogInForm history={history} dispatch={dispatch} loginError={loginError} />
    </div>
  );
};

LogInDumb.propTypes = propTypes;
LogInDumb.defaultProps = defaultProps;

// This separation makes no sense!
export default compose(connect({ loginError: selectLoginError }), withRouter)(LogInDumb);
