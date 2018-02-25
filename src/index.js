import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';

import './index.css';
import makeStore from './redux/store/';
import App from './handlers/App';
import registerServiceWorker from './registerServiceWorker';

var config = {
  apiKey: 'AIzaSyAXIMRyEBxa_9F2pOI3bvdqTCaDogf0CSw',
  authDomain: 'set-counter.firebaseapp.com',
  databaseURL: 'https://set-counter.firebaseio.com',
  projectId: 'set-counter',
  storageBucket: 'set-counter.appspot.com',
  messagingSenderId: '374757304471',
};
firebase.initializeApp(config);

async function signIn() {
  try {
    await firebase.auth().signInAnonymously();
    console.log('2');
  } catch (err) {
    console.log('error', err);
  }
}

async function renderApp() {
  console.log('1');
  await signIn();
  console.log('3');

  // Get a reference to the database service
  var database = firebase.firestore();

  const store = makeStore();
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

  registerServiceWorker();
}

renderApp();
