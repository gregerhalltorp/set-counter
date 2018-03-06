import React from 'react';
import PropTypes from 'prop-types';

import { LogOutButton } from '../LogOut/LogOut';

const propTypes = {
  user: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
};

const defaultProps = {
  user: null,
};

const Greeting = ({ user }) => {
  if (!user) {
    return false;
  }

  return (
    <div className="sc-header__greeting">
      <p>Hej {user.email}</p>
      <span>
        <LogOutButton />
      </span>
    </div>
  );
};

Greeting.propTypes = propTypes;
Greeting.defaultProps = defaultProps;

export default Greeting;
