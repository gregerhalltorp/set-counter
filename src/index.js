import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import makeStore from './redux/store/';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = makeStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

render(<App />, document.getElementById('root'));
registerServiceWorker();
