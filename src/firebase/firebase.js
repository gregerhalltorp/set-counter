import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAXIMRyEBxa_9F2pOI3bvdqTCaDogf0CSw',
  authDomain: 'set-counter.firebaseapp.com',
  databaseURL: 'https://set-counter.firebaseio.com',
  projectId: 'set-counter',
  storageBucket: 'set-counter.appspot.com',
  messagingSenderId: '374757304471',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
// const fs = firebase.firestore();

export { auth };
