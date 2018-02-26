import * as ACTIONS from '../actions/actions';

export const initialState = { version: 1 };

const updateExerciseFunction = (state, action) => {
  const { exercise } = action.data;
  if (!exercise) {
    return state;
  }
  const exI = state.exercises.findIndex(e => e.id === exercise.id);
  const newState = {
    ...state,
    exercises: state.exercises.map((item, index) => {
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
  };
  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_EXERCISE:
      return updateExerciseFunction(state, action);
    default:
      return state;
  }
};
