/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';

import './index.css';
import { firebase } from './firebase';
import makeStore from './redux/store/';
import Root from './components/Root.jsx';
import registerServiceWorker from './registerServiceWorker';

const initializeStoreSubscriptions = (store) => {
  firebase.auth.onAuthStateChanged((authUser) => {
    store.dispatch({ type: 'AUTH_STATE_CHANGED', data: authUser || false });
  });
};

async function renderApp() {
  const store = makeStore();
  initializeStoreSubscriptions(store);

  render(<Root store={store} />, document.getElementById('root'));

  registerServiceWorker();
}

renderApp();
