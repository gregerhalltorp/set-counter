// import { createSelector } from 'reselect';

import valueIn from '../../utils/valueIn';

export const selectApp = state => valueIn(state, 'app');

export const selectExercises = state => valueIn(state, 'app.exercises');
