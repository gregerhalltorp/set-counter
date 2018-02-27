/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import AppHandler from '../handlers/AppHandler.jsx';

const Root = ({ store }) => (
  <Provider store={store}>
    <AppHandler />
  </Provider>
);

export default Root;
