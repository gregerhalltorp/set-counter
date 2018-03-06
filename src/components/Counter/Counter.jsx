import React from 'react';
import PropTypes from 'prop-types';

import './Counter.css';

const selectSetsRepsDoneToday = (sets) => {
  const todayString = new Date().toLocaleDateString();
  return Object.keys(sets)
    .filter(setId => sets[setId].date.toLocaleDateString() === todayString)
    .reduce(
      (acc, cur) => {
        return { sets: ++acc.sets, reps: acc.reps + sets[cur].reps };
      },
      {
        sets: 0,
        reps: 0,
      }
    );
};

const propTypes = {
  exercise: PropTypes.shape({}),
  updater: PropTypes.func.isRequired,
};

const defaultProps = {
  exercise: {},
};

const Counter = ({ exercise, updater }) => {
  if (!exercise) {
    return false;
  }
  const { reps, name, sets } = exercise;

  const todaysValues = selectSetsRepsDoneToday(sets);

  const setsRepsDone = `${todaysValues.sets} sets / ${todaysValues.reps} reps done`;

  return (
    <div>
      <div className="sc-counter">
        <div className="sc-counter__heading">{name}</div>
        <button className="sc-counter__button" onClick={updater}>
          {reps}
        </button>
        <div className="sc-counter__set-info">{setsRepsDone}</div>
      </div>
    </div>
  );
};

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

export default Counter;
