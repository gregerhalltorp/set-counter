/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AppHandler from '../handlers/AppHandler.jsx';

const Root = ({ store }) => (
  <Provider store={store}>
    {/* <Router basename="/set-counter"> */}
    <AppHandler />
    {/* </Router> */}
  </Provider>
);

export default Root;
