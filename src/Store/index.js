import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Reducers from 'Reducers';

const middlewares = [thunk];

// if (process.env.NODE_ENV !== 'production') {
//   const { logger } = require('redux-logger');
//   middlewares.push(logger);
// }

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

export default createStore(
  Reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);