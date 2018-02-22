import React from "react";

const Counter = ({ exercise }) => {
  const { reps } = exercise;
  return (
    <div className="sc-counter">
      <button className="sc-counter__button">{reps}</button>
    </div>
  );
};

export default Counter;
