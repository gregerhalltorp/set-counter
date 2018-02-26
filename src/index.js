/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import './index.css';
import makeStore from './redux/store/';
import App from './handlers/AppHandler.jsx';
import registerServiceWorker from './registerServiceWorker';
import { getLocalStorageState, saveStateToLocalStorage } from './utils/localStorage';

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

  const localData = getLocalStorageState();
  const store = makeStore(localData);

  store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

  registerServiceWorker();
}

renderApp();
