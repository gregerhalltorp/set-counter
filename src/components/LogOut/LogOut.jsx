import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { connect } from '../../utils';
import { doLogout } from '../../redux/actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const LogOutDumb = ({ dispatch, history }) => {
  return (
    <div>
      Log Out
      <div>
        <button type="button" onClick={() => dispatch(doLogout({ history }))}>
          Log out!
        </button>
      </div>
    </div>
  );
};

LogOutDumb.propTypes = propTypes;

const LogOutButtonDumb = ({ dispatch, history }) => (
  <button type="button" onClick={() => dispatch(doLogout({ history }))}>
    Log out!
  </button>
);
LogOutButtonDumb.propTypes = propTypes;

export const LogOutButton = compose(connect({}), withRouter)(LogOutButtonDumb);

export default compose(connect({}), withRouter)(LogOutDumb);
