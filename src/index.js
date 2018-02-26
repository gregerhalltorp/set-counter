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

const dateReviver = (key, value) => (~key.toLowerCase().indexOf('date') ? new Date(value) : value);

const getLocalStorageData = () => {
  const stoStateStr = window.localStorage && window.localStorage.getItem('setCounter');
  if (stoStateStr) {
    return { app: JSON.parse(stoStateStr, dateReviver) };
  }

  return {
    app: {
      exercises: [
        {
          id: 0,
          name: 'Armhävningar',
          sets: [],
          reps: 25,
          lastUpdatedDate: new Date(),
        },
      ],
      lastUpdatedDate: new Date(),
    },
  };
};

async function renderApp() {
  await signIn();

  // Get a reference to the database service
  // const database = firebase.firestore();

  const localData = getLocalStorageData();
  const store = makeStore(localData);
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

  registerServiceWorker();
}

renderApp();
