import React from "react";

const selectSetsRepsDoneToday = sets => {
  const todayString = new Date().toLocaleDateString();
  return sets
    .filter(set => set.date.toLocaleDateString() === todayString)
    .reduce((acc, cur) => ({ sets: acc.sets++, reps: acc.reps + cur.reps }), {
      sets: 0,
      reps: 0
    });
};

const Counter = ({ exercise, updater }) => {
  const { reps, name, sets } = exercise;

  const todaysValues = selectSetsRepsDoneToday(sets);
  const setsRepsDone = `${todaysValues.sets} sets / ${todaysValues.reps} reps done`;

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

export default Counter;
