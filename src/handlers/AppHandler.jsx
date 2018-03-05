import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import Navigation from '../components/Navigation/Navigation.jsx';
import ExerciseHandler from '../handlers/ExerciseHandler.jsx';
import LogIn from '../components/LogIn/LogIn.jsx';
import LogOut from '../components/LogOut/LogOut.jsx';
import './App.css';

const AppHandler = () => {
  return (
    <div className="sc-app">
      <Router>
        <div>
          <button href="#" className="oh-so-hidden" onClick={() => {}}>
            &nbsp;
          </button>
          <div className="sc-header">
            <Navigation />
          </div>
          <div className="sc-body">
            <Route exact path={ROUTES.LANDING} component={ExerciseHandler} />
            <Route exact path={ROUTES.HOME} render={() => <Redirect to={ROUTES.LANDING} />} />
            <Route exact path={ROUTES.LOG_IN} component={LogIn} />
            <Route exact path={ROUTES.LOG_OUT} component={LogOut} />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default AppHandler;
