// import { createSelector } from 'reselect';
import valueIn from '../../utils/valueIn';

export const selectExercises = state => valueIn(state, 'exercises');
