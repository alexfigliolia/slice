
import 'Styles/index.scss';
import 'focus-visible';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Store from './Store';
import App from './App';
import reportWebVitals from './reportWebVitals';

render(
  <Provider store={Store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
