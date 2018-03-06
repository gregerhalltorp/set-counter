import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateExercise } from '../redux/actions';
import { selectExercises } from '../redux/selectors/exercisesSelectors';
import Counter from '../components/Counter/Counter';

const propTypes = {
  exercises: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  exercises: [],
};

const ExerciseHandlerDumb = ({ dispatch, exercises }) => {
  const potentialExercises = (Object.keys(exercises) || []).map((exerciseId) => {
    const onUpdateClick = () => dispatch(updateExercise({ exerciseId }));
    return <Counter key={exerciseId} exerciseId={exerciseId} updater={onUpdateClick} />;
  });

  return <div>{potentialExercises}</div>;
};

ExerciseHandlerDumb.defaultProps = defaultProps;
ExerciseHandlerDumb.propTypes = propTypes;

const mapStateToProps = state => ({
  exercises: selectExercises(state),
});

export default connect(mapStateToProps)(ExerciseHandlerDumb);
