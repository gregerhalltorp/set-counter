import * as firebase from 'firebase';
import 'firebase/firestore';

import tryCatch from '../utils/tryCatch';

let firestore;

const init = async () => {
  if (firestore) {
    return new Promise(resolve => resolve(firestore));
  }
  return new Promise(async (resolve) => {
    const [err] = await tryCatch(() => firebase.firestore().enablePersistence());
    if (err) {
      if (err.code === 'failed-precondition') {
        console.log(err);
      } else if (err.code === 'unimplemented') {
        console.log('not implemented in this browser!');
      }
    }
    firestore = firebase.firestore();
    resolve(firestore);
  });
};

export const getUser = async (uid) => {
  // eslint-disable-next-line no-unused-vars
  const [, fs] = await tryCatch(() => init());
  return fs.doc(`users/${uid}`).get();
};

export const setUserExercises = async ({ uid, exercises } = {}) => {
  console.log(uid, exercises);
  // eslint-disable-next-line no-unused-vars
  const [, fs] = await tryCatch(() => init());
  return fs.doc(`users/${uid}`).update({ exercisesMap: exercises });
};

export const getUser2 = async (uid) => {
  // eslint-disable-next-line no-unused-vars
  const [, fs] = await tryCatch(() => init());
  console.log('getting the doc now 222222222222');
  const [err, res] = await tryCatch(() => fs.doc(`users/${uid}`).get());
  console.log('err', err);
  console.log('res', res && res.data());
};
