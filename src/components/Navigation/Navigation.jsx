import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const propTypes = {
  auth: PropTypes.bool,
};

const defaultProps = {
  auth: false,
};

const Navigation = ({ auth }) => {
  console.log(auth);
  if (auth) {
    return (
      <div className="sc-nav">
        <ul className="sc-nav__nav-list">
          <li className="sc-nav__nav-item">
            <Link to={ROUTES.LANDING} href={ROUTES.LANDING}>
              Home
            </Link>
          </li>
          <li className="sc-nav__nav-item">
            <Link to={ROUTES.LOG_OUT} href={ROUTES.LOG_OUT}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="sc-nav">
      <ul className="sc-nav__nav-list">
        <li className="sc-nav__nav-item">
          <Link to={ROUTES.LANDING} href={ROUTES.LANDING}>
            Home
          </Link>
        </li>
        <li className="sc-nav__nav-item">
          <Link to={ROUTES.LOG_IN} href={ROUTES.LOG_IN}>
            Log In
          </Link>
        </li>
      </ul>
    </div>
  );
};

Navigation.defaultProps = defaultProps;
Navigation.propTypes = propTypes;

export default Navigation;
