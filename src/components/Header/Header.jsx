import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation.jsx';
import Greeting from './_Greeting.jsx';

import { selectUser } from '../../redux/selectors/appSelectors';

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

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(HeaderDumb);
