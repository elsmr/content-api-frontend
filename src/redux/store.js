import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { reducer as formReducer } from 'redux-form';
import { reducer as user, loginEpic, loadTokenEpic } from './modules/user';
import thunk from 'redux-thunk';
const rootEpic = combineEpics(loginEpic, loadTokenEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);
const middlewares = [thunk, epicMiddleware];
const reducers = combineReducers({
  user,
  form: formReducer
})

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger');
  middlewares.push(logger());
}

export default createStore(reducers, applyMiddleware(...middlewares));