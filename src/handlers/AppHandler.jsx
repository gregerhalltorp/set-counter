import React from 'react';
import { connect } from 'react-redux';

// import logo from '../logo.svg';
import { updateExercise } from '../redux/actions';
import { selectExercises } from '../redux/selectors/appSelectors';
import Counter from '../components/Counter/Counter.jsx';
import './App.css';

export const AppHandlerDumb = ({ exercises, dispatch }) => {
  const potentialExercises = (exercises || []).map((exercise) => {
    const onUpdateClick = () => dispatch(updateExercise({ exercise }));
    return <Counter key={exercise.name} exercise={exercise} updater={onUpdateClick} />;
  });

  return (
    <div className="sc-app">
      <button href="#" className="oh-so-hidden" onClick={() => {}}>
        &nbsp;
      </button>
      {potentialExercises}
    </div>
  );
};

// clearStorage = () => {
//   // eslint-disable-next-line no-unused-expressions
//   window.localStorage.clear && window.localStorage.clear();
// };

// }

const mapStateToProps = state => ({
  exercises: selectExercises(state),
});

export default connect(mapStateToProps)(AppHandlerDumb);
