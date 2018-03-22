import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '../../utils';
import Navigation from '../Navigation/Navigation.jsx';
import Greeting from './_Greeting.jsx';
import { selectUser } from '../../redux/selectors/appSelectors';
import './Header.css';

const propTypes = {
  user: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
};

const defaultProps = {
  user: null,
};

const HeaderDumb = ({ user }) => {
  if (user === null) {
    return null;
  }

  return (
    <div className="sc-header">
      <Navigation auth={!!user} />

      <Greeting user={user} />
    </div>
  );
};

HeaderDumb.propTypes = propTypes;
HeaderDumb.defaultProps = defaultProps;

export default connect({
  user: selectUser,
})(HeaderDumb);
