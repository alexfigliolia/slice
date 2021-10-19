import { combineReducers } from "redux";
import logSlowReducers from 'redux-log-slow-reducers';
import Base from './Base';
import Screen from './Screen';

let Reducers = combineReducers({
  Base,
  Screen
});

if (process.env.NODE_ENV !== 'production') {
  Reducers = logSlowReducers(Reducers);
}

export default Reducers;