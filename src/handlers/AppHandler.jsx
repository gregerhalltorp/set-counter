import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { connect } from '../utils';
import * as ROUTES from '../constants/routes';
import * as PARAMS from '../constants/params';
import Header from '../components/Header/Header.jsx';
import ExerciseHandler from '../handlers/ExerciseHandler.jsx';
import LogIn from '../components/LogIn/LogIn.jsx';
import ExerciseDetails from '../components/ExerciseDetails/ExerciseDetails.jsx';
import valueIn from '../utils/valueIn';
import './App.css';

import { selectUser } from '../redux/selectors/appSelectors';
import { selectExercisesSynced } from '../redux/selectors/exercisesSelectors';

const propTypes = {
  user: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
};

const defaultProps = {
  user: null,
};

const SyncedIndicator = ({ isSynced }) =>
  (isSynced ? (
    <div className="sc-body__syncindicator sc-body__syncindicator--synced" />
  ) : (
    <div className="sc-body__syncindicator sc-body__syncindicator--not-synced" />
  ));

// <BrowserRouter basename="/repo-name" />

const AppHandlerDumb = ({ user, isSynced }) => {
  return (
    <div className="sc-app">
      <Router basename="/set-counter">
        <Route
          render={({ location }) => {
            return (
              <div>
                <Header />
                <div className="sc-body">
                  <TransitionGroup style={{ width: '100%' }}>
                    <CSSTransition
                      key={location.key}
                      classNames={valueIn(location, 'state.action') || ''}
                      timeout={500}
                    >
                      <Switch location={location}>
                        <Route exact path={ROUTES.LANDING} component={ExerciseHandler} />
                        <Route
                          exact
                          path={ROUTES.HOME}
                          render={() => <Redirect to={ROUTES.LANDING} />}
                        />
                        <Route
                          path={`${ROUTES.EXERCISEDETAILS}${PARAMS.EXERCISE_ID}`}
                          component={ExerciseDetails}
                        />
                        <Route
                          exact
                          path={ROUTES.LOG_IN}
                          render={() => (user ? <Redirect to={ROUTES.LANDING} /> : <LogIn />)}
                        />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
                <button href="#" className="oh-so-hidden" onClick={() => {}}>
                  &nbsp;
                </button>
                <SyncedIndicator isSynced={isSynced} />
              </div>
            );
          }}
        />
      </Router>
    </div>
  );
};

AppHandlerDumb.propTypes = propTypes;
AppHandlerDumb.defaultProps = defaultProps;

export default connect({
  user: selectUser,
  isSynced: selectExercisesSynced,
})(AppHandlerDumb);
