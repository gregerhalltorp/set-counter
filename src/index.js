/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';

import './index.css';
import { firebase, fs } from './firebase';
import makeStore from './redux/store/';
import Root from './components/Root.jsx';
import registerServiceWorker from './registerServiceWorker';
import { authStateChanged, newDayArrived, databaseUserUpdated } from './redux/actions';
import { isBefore, valueIn } from './utils';
import { selectDebtUpdatedDate } from './redux/selectors/exercisesSelectors';

const initializeStoreSubscriptions = (store) => {
  firebase.auth.onAuthStateChanged((authUser) => {
    store.dispatch(authStateChanged({ authUser: authUser || false }));
    const uid = valueIn(authUser, 'uid');
    if (uid) {
      // Unssubscribe otherwise, I suppose...
      fs.subscribeToUser(uid, (doc) => {
        if (!doc.metadata.hasPendingWrites) {
          store.dispatch(databaseUserUpdated({ user: doc.data() }));
        }
      });
    }
  });

  const periodicalUpdate = () => {
    const oldDeptDate = selectDebtUpdatedDate(store.getState());
    if (!oldDeptDate || isBefore(oldDeptDate, new Date(), 'day')) {
      store.dispatch(newDayArrived({}));
    }
  };

  setInterval(periodicalUpdate, 60000);
  // TODO: Make this dependant on the previous one so there is a uid
  // Or update the updateddates of all. but that seems dumb.
  // Or place the debtdate on exercises. More work though.
  // periodicalUpdate(); <--
};

async function renderApp() {
  const store = makeStore();
  initializeStoreSubscriptions(store);

  render(<Root store={store} />, document.getElementById('root'));

  registerServiceWorker();
}

renderApp();
