import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import './ExerciseDetails.css';
import { selectTotalSetsReps, selectExercise } from '../../redux/selectors/exercisesSelectors';

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

const mapStateToProps = (state, props) => {
  const betterProps = { exerciseId: props.match.params.exerciseId };
  return {
    exercise: selectExercise(state, betterProps),
    sr: selectTotalSetsReps(state, betterProps),
    // sets: selectSets(state, { exerciseId: props.match.params.exerciseId }),
  };
};

export default connect(mapStateToProps)(ExerciseDetailsDumb);
