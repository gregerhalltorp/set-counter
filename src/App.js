import React, { Component } from "react";
import logo from "./logo.svg";
import Counter from "./Counter/Counter.jsx";
import "./App.css";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      exercises: [
        {
          name: "Armhävningar",
          sets: 0,
          reps: 25
        }
      ]
    };
  }

  render() {
    const { exercises } = this.state;

    const potentialExercises = (exercises || []).map(exercise => {
      return <Counter exercise={exercise} />;
    });

    return (
      <div className="App">
        {potentialExercises}
      </div>
    );
  }
}

export default App;
