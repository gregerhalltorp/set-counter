import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AppHandler from '../handlers/AppHandler.jsx';

const propTypes = {
  store: PropTypes.shape.isRequired,
};

const Root = ({ store }) => (
  <Provider store={store}>
    <AppHandler />
  </Provider>
);

Root.propTypes = propTypes;

export default Root;
