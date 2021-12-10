import { combineReducers } from "redux";
import logSlowReducers from 'redux-log-slow-reducers';
import Base from './Base';
import Screen from './Screen';
import Backlog from './Backlog';
import Team from './Team';

let Reducers = combineReducers({
  Base,
  Screen,
  Backlog,
  Team
});

if (process.env.NODE_ENV !== 'production') {
  Reducers = logSlowReducers(Reducers);
}

export default Reducers;