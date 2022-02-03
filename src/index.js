import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';

import App from './App';
import reducer, { initialState } from './state/reducer';
import { StateProvider } from './state/StateProvider';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);