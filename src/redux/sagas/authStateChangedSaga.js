import { put, select, takeLatest } from 'redux-saga/effects';

import * as ACTIONS from '../actions/actions';
import { syncToDatabase, updateAuthState, batchAddExercises } from '../actions';
import { fs } from '../../firebase';
import tryCatchSaga from '../../utils/tryCatchSaga';
import { selectExercises, selectExercisesSynced } from '../selectors/exercisesSelectors';
import valueIn from '../../utils/valueIn';

const findExerciseInOtherMap = (currentMap, otherMap, key) => {
  if (otherMap[key]) {
    return key;
  }
  for (let i = 0; i < Object.keys(otherMap).length; ++i) {
    const rKey = Object.keys(otherMap)[i];
    if (otherMap[rKey].name === currentMap[key].name) {
      return rKey;
    }
  }

  return false;
};

const syncExercise = (local, remote) => {
  const localLastUpdated = local.lastUpdatedDate > remote.lastUpdatedDate;
  const theThing = {
    name: local.name,
    lastUpdatedDate: localLastUpdated ? local.lastUpdatedDate : remote.lastUpdatedDate,
    reps: localLastUpdated && local.reps ? local.reps : remote.reps,
    debt: localLastUpdated && local.debt ? local.debt : remote.debt,
    dailyGoal: localLastUpdated && local.dailyGoal ? local.dailyGoal : remote.dailyGoal,
    sets: { ...local.sets, ...remote.sets },
  };
  // console.log('theThing', theThing);
  return theThing;
};

// move some stuff to here!
export function* authStateChangedFunction(action) {
  const localExercises = yield select(selectExercises);
  const isSynced = yield select(selectExercisesSynced);

  const uid = valueIn(action, 'data.authUser.uid');

  yield put(updateAuthState({ authUser: valueIn(action, 'data.authUser') }));

  if (!uid) {
    return;
  }

  const { err, res } = yield tryCatchSaga(() => fs.getUser(uid));
  if (err) {
    // DO SOMETHING ELSE HERE, MAYBE PUT A THING?
  }

  // console.log(res.data());
  const { exercisesMap: remoteExercises, debtUpdatedDate } = res.data();

  // Current solution works but is inefficient, will overwrite local storage
  // unnecessarily
  // And trouble eg. if DB is empty but localstorage indicates synced...

  if (remoteExercises) {
    if (!localExercises || isSynced) {
      // console.log('putting without shouldSync');
      yield put(batchAddExercises({ exercises: remoteExercises, debtUpdatedDate }));
    } else {
      const newExercises = {};
      Object.keys(localExercises).forEach((eKey) => {
        const remoteKey = findExerciseInOtherMap(localExercises, remoteExercises, eKey);
        if (remoteKey) {
          newExercises[eKey] = syncExercise(localExercises[eKey], remoteExercises[remoteKey]);
        } else {
          newExercises[eKey] = localExercises[eKey];
        }
      });
      Object.keys(remoteExercises).forEach((rKey) => {
        const localKey = findExerciseInOtherMap(remoteExercises, localExercises, rKey);
        if (!localKey) {
          newExercises[rKey] = remoteExercises[rKey];
        }
      });
      if (newExercises) {
        // console.log('putting with shouldSync');
        yield put(batchAddExercises({ exercises: newExercises, debtUpdatedDate, shouldSync: true }));
      }
      // Måste testa en som saknas loaklt men finns remote
    }
  } else if (localExercises && !isSynced) {
    // yield console.log('authstatechanged dispatching');
    yield put(syncToDatabase());
  }
}

export default function* authStateChangedSaga() {
  yield takeLatest(ACTIONS.AUTH_STATE_CHANGED, authStateChangedFunction);
}
