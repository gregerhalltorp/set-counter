import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import logo from '../logo.svg';
import { updateExercise } from '../redux/actions';
import { selectExercises } from '../redux/selectors/exercisesSelectors';
import Counter from '../components/Counter/Counter.jsx';
import './App.css';

const propTypes = {
  exercises: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  exercises: [],
};

export const AppHandlerDumb = ({ exercises, dispatch }) => {
  const potentialExercises = (Object.keys(exercises) || []).map((exerciseId) => {
    const onUpdateClick = () => dispatch(updateExercise({ exerciseId }));
    return <Counter key={exerciseId} exercise={exercises[exerciseId]} updater={onUpdateClick} />;
  });

  return (
    <div className="sc-app">
      <button href="#" className="oh-so-hidden" onClick={() => {}}>
        &nbsp;
      </button>
      {potentialExercises}
    </div>
  );
};

AppHandlerDumb.defaultProps = defaultProps;
AppHandlerDumb.propTypes = propTypes;

// clearStorage = () => {
//   // eslint-disable-next-line no-unused-expressions
//   window.localStorage.clear && window.localStorage.clear();
// };

// }

const mapStateToProps = state => ({
  exercises: selectExercises(state),
});

export default connect(mapStateToProps)(AppHandlerDumb);
