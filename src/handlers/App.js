import React, { Component } from 'react';
import logo from '../logo.svg';
import Counter from '../components/Counter/Counter.jsx';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    const stoStateStr =
      window.localStorage && window.localStorage.getItem('setCounter');

    const state = (stoStateStr &&
      JSON.parse(stoStateStr, (key, value) => {
        console.log(key);
        if (~key.toLowerCase().indexOf('date')) {
          return new Date(value);
        } else return value;
      })) || {
      exercises: [
        {
          id: 0,
          name: 'Armhävningar',
          sets: [],
          reps: 25,
          lastUpdatedDate: new Date(),
        },
      ],
    };

    this.state = state;
  }

  updateExcerciseCount = exercise => () => {
    const exI = this.state.exercises.findIndex(e => e.id === exercise.id);

    //TODO: change to function as in https://reactjs.org/docs/react-component.html#setstate
    this.setState(
      {
        ...this.state,
        exercises: this.state.exercises.map((item, index) => {
          if (index !== exI) {
            return item;
          }
          const sets = item.sets.slice();
          sets.push({ reps: exercise.reps, date: new Date() });
          return {
            ...item,
            sets,
            lastUpdated: new Date(),
          };
        }),
      },
      () => {
        window.localStorage.setItem &&
          window.localStorage.setItem('setCounter', JSON.stringify(this.state));
      }
    );
  };

  clearStorage = () => {
    window.localStorage.clear && window.localStorage.clear();
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
        <div className="oh-so-hidden" onClick={this.clearStorage}>
          &nbsp;
        </div>
        {potentialExercises}
      </div>
    );
  }
}

export default App;
