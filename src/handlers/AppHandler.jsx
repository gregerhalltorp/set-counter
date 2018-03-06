import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import Header from '../components/Header/Header.jsx';
import ExerciseHandler from '../handlers/ExerciseHandler.jsx';
import LogIn from '../components/LogIn/LogIn.jsx';
import LogOut from '../components/LogOut/LogOut.jsx';
import './App.css';

import { selectUser } from '../redux/selectors/appSelectors';

const propTypes = {
  user: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
};

const defaultProps = {
  user: null,
};

const AppHandlerDumb = ({ user }) => {
  return (
    <div className="sc-app">
      <Router>
        <div>
          <button href="#" className="oh-so-hidden" onClick={() => {}}>
            &nbsp;
          </button>
          <Header />
          <div className="sc-body">
            <Route exact path={ROUTES.LANDING} component={ExerciseHandler} />
            <Route exact path={ROUTES.HOME} render={() => <Redirect to={ROUTES.LANDING} />} />
            <Route
              exact
              path={ROUTES.LOG_IN}
              render={() => (user ? <Redirect to={ROUTES.LANDING} /> : <LogIn />)}
            />
            <Route exact path={ROUTES.LOG_OUT} component={LogOut} />
          </div>
        </div>
      </Router>
    </div>
  );
};

AppHandlerDumb.propTypes = propTypes;
AppHandlerDumb.defaultProps = defaultProps;

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(AppHandlerDumb);
