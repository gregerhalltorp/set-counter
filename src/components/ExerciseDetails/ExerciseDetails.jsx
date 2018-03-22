import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';
import './ExerciseDetails.css';
import { selectTotalSetsReps, selectExercise } from '../../redux/selectors/exercisesSelectors';
import { mapSelectorsToProps, connect } from '../../utils';

const propTypes = {
  sr: PropTypes.shape({}).isRequired,
  exercise: PropTypes.shape({}).isRequired,
};

export const ExerciseDetailsDumb = ({ sr, exercise }) => {
  return (
    <div className="exercise-details">
      <Link
        className="sc-exercise__button"
        to={{ pathname: ROUTES.LANDING, state: { action: 'pop' } }}
        href={ROUTES.LANDING}
      >
        &lt;
      </Link>
      <div style={{ width: '95%' }}>
        <span>
          ExerciseDetails: {sr.sets} sets, {sr.reps} reps done total
        </span>
        <br />
        <span>Current debt: {exercise.debt}</span>
      </div>
    </div>
  );
};

ExerciseDetailsDumb.propTypes = propTypes;

export default connect(mapSelectorsToProps(
  {
    exercise: selectExercise,
    sr: selectTotalSetsReps,
  },
  props => ({ exerciseId: props.match.params.exerciseId })
))(ExerciseDetailsDumb);
