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
  const [_, fs] = await tryCatch(() => init());
  console.log('getting the doc now');
  return fs.doc(`users/${uid}`).get();
};

export const getUser2 = async (uid) => {
  // eslint-disable-next-line no-unused-vars
  const [_, fs] = await tryCatch(() => init());
  console.log('getting the doc now');
  const [err, res] = await tryCatch(() => fs.doc(`users/${uid}`).get());
  console.log('err', err);
  console.log('res', res && res.data());
};
