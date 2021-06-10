import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import { sessionsReducer, currentSessionReducer } from './sessions';
import blockedSitesReducer from './blockSites';
const reducer = combineReducers({
  auth,
  blockedSites: blockedSitesReducer,
  sessions: sessionsReducer,
  currentSession: currentSessionReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
