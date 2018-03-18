import { createSelector } from 'reselect';

import valueIn from '../../utils/valueIn';

export const selectExerciseState = state => valueIn(state, 'exercises');

export const selectExercises = state => valueIn(state, 'exercises.exercises');
export const selectExerciseIds = createSelector([selectExercises], (exercises) => {
  Object.keys(exercises).map(eKey => eKey);
});

export const selectExercisesSynced = state => valueIn(state, 'exercises.isSynced');

export const selectDebtUpdatedDate = state => valueIn(state, 'exercises.debtUpdatedDate');

export const selectExercise = (state, props) =>
  valueIn(state, ['exercises', 'exercises', props.exerciseId]);

export const selectSets = (state, props) =>
  valueIn(state, ['exercises', 'exercises', props.exerciseId, 'sets']);

const getSetsForDay = (sets, dateString) => {
  return Object.keys(sets || [])
    .filter(setId => sets[setId].date.toLocaleDateString() === dateString)
    .reduce((acc, cur) => ({ sets: ++acc.sets, reps: acc.reps + sets[cur].reps }), {
      sets: 0,
      reps: 0,
    });
};

export const selectTodaysSets = createSelector([selectSets], (sets) => {
  const todayString = new Date().toLocaleDateString();
  return getSetsForDay(sets, todayString);
});

export const selectTotalSetsReps = createSelector([selectSets], (sets) => {
  return Object.keys(sets || []).reduce(
    (acc, cur) => {
      return { sets: ++acc.sets, reps: acc.reps + sets[cur].reps };
    },
    { sets: 0, reps: 0 }
  );
});

export const selectFirstSetDate = createSelector([selectSets], (sets) => {
  let minDate;
  Object.keys(sets || []).forEach((key) => {
    if (minDate === undefined || sets[key].date < minDate) {
      minDate = sets[key].date;
    }
  });
  return minDate;
});

// export const selectSortedSets
