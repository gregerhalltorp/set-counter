import React from "react";

const Counter = ({ exercise, updater }) => {
  const { reps, name } = exercise;
  return (
    <div className="sc-counter">
      <div className="sc-counter__heading">{name}</div>
      <button className="sc-counter__button" onClick={() => updater(exercise)}>
        {reps}
      </button>
    </div>
  );
};

export default Counter;
