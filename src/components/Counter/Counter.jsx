import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '../../utils';
import { selectTodaysSets, selectExercise } from '../../redux/selectors/exercisesSelectors';
import './Counter.css';

const propTypes = {
  exercise: PropTypes.shape({}),
  updater: PropTypes.func.isRequired,
  todaysSets: PropTypes.shape({}).isRequired,
};

const defaultProps = {
  exercise: {},
};

const CounterDumb = ({ exercise, updater, todaysSets }) => {
  if (!exercise) {
    return false;
  }

  const { reps, name } = exercise;

  const setsRepsDone = `${todaysSets.sets} sets / ${todaysSets.reps} reps done`;

  return (
    <div className="sc-counter">
      <div className="sc-counter__heading">{name}</div>
      <button className="sc-counter__button" onClick={updater}>
        {reps}
      </button>
      <div className="sc-counter__set-info">{setsRepsDone}</div>
    </div>
  );
};

CounterDumb.propTypes = propTypes;
CounterDumb.defaultProps = defaultProps;

export default connect({
  exercise: selectExercise,
  todaysSets: selectTodaysSets,
})(CounterDumb);
