import * as ACTIONS from '../actions/actions';

export const initialState = {
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

const updateExerciseFunction = (state, action) => {
  const { exercise } = action.data;
  if (!exercise) {
    return state;
  }
  const exI = state.findIndex(e => e.id === exercise.id);
  const newState = state.map((item, index) => {
    if (index !== exI) {
      return item;
    }
    const sets = item.sets.slice();
    sets.push({ reps: exercise.reps, date: new Date() });
    return {
      ...item,
      sets,
      lastUpdatedDate: new Date(),
    };
  });
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
