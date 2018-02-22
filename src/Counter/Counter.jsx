import React from "react";

const Counter = ({ exercise, updater }) => {
  const { reps, name, sets } = exercise;

  const setsRepsDone = `${sets} sets / ${sets * reps} reps done`;

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
