/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import './index.css';
import makeStore from './redux/store/';
import Root from './components/Root.jsx';
import registerServiceWorker from './registerServiceWorker';

// const config = {
//   apiKey: 'AIzaSyAXIMRyEBxa_9F2pOI3bvdqTCaDogf0CSw',
//   authDomain: 'set-counter.firebaseapp.com',
//   databaseURL: 'https://set-counter.firebaseio.com',
//   projectId: 'set-counter',
//   storageBucket: 'set-counter.appspot.com',
//   messagingSenderId: '374757304471',
// };
// firebase.initializeApp(config);

async function signIn() {
  // try {
  //   await firebase.auth().signInAnonymously();
  // } catch (err) {
  //   // eslint-disable-next-line no-console
  //   console.log('error', err);
  // }
}

async function renderApp() {
  await signIn();

  // Get a reference to the database service
  // const database = firebase.firestore();

  const store = makeStore();

  render(<Root store={store} />, document.getElementById('root'));

  registerServiceWorker();
}

renderApp();
