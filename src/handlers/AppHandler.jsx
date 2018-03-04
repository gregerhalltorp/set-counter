import React from 'react';

// import * as routes from '../constants/routes';
import CounterHandler from '../handlers/CounterHandler.jsx';
import './App.css';

const AppHandler = () => {
  return (
    <div className="sc-app">
      <button href="#" className="oh-so-hidden" onClick={() => {}}>
        &nbsp;
      </button>
      <CounterHandler />
    </div>
  );
};

export default AppHandler;
