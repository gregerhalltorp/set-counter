import { createSelector } from 'reselect';

import valueIn from '../../utils/valueIn';

export const selectExerciseState = state => valueIn(state, 'exercises');

export const selectExercises = state => valueIn(state, 'exercises.exercises');
export const selectExerciseIds = createSelector([selectExercises], (exercises) => {
  Object.keys(exercises).map(eKey => eKey);
});

export const selectExercisesSynced = state => valueIn(state, 'exercises.isSynced');

export const selectExercise = (state, props) =>
  valueIn(state, ['exercises', 'exercises', props.exerciseId]);

export const selectSets = (state, props) =>
  valueIn(state, ['exercises', 'exercises', props.exerciseId, 'sets']);

export const selectTodaysSets = createSelector([selectSets], (sets) => {
  const todayString = new Date().toLocaleDateString();
  return Object.keys(sets || [])
    .filter(setId => sets[setId].date.toLocaleDateString() === todayString)
    .reduce(
      (acc, cur) => {
        return { sets: ++acc.sets, reps: acc.reps + sets[cur].reps };
      },
      { sets: 0, reps: 0 }
    );
});
