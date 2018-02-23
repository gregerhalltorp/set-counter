import React, { Component } from "react";
import logo from "./logo.svg";
import Counter from "./Counter/Counter.jsx";
import "./App.css";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    const exercises = (window.localStorage &&
      window.localStorage.getItem("exercises")) || [
      {
        id: 0,
        name: "Armhävningar",
        sets: [],
        reps: 25,
        lastUpdated: new Date()
      }
    ];

    this.state = {
      exercises
    };
  }

  updateExcerciseCount = exercise => () => {
    const exI = this.state.exercises.findIndex(e => e.id === exercise.id);
    const newEx = { ...this.state.exercises[exI] };
    newEx.sets++;
    const exercises = this.state.exercises
      .slice(0, exI)
      .concat(newEx)
      .concat(this.state.exercises.slice(exI + 1));
    this.setState({ ...this.state, exercises });
  };

  render() {
    const { exercises } = this.state;

    const potentialExercises = (exercises || []).map(exercise => {
      const updater = this.updateExcerciseCount(exercise);
      return (
        <Counter key={exercise.name} exercise={exercise} updater={updater} />
      );
    });

    return (
      <div className="sc-app">
        {potentialExercises}
      </div>
    );
  }
}

export default App;
