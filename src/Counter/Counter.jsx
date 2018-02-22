import React from "react";

const Counter = ({ exercise }) => {
  const { reps, name } = exercise;
  return (
    <div className="sc-counter">
      <div className="sc-counter__heading">{name}</div>
      <button className="sc-counter__button">{reps}</button>
    </div>
  );
};

export default Counter;
