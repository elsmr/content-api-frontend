import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { reducer as form } from 'redux-form';
import { reducer as user, loginEpic, logoutEpic, loadTokenEpic } from './modules/user';
import { reducer as collections, fetchCollectionsEpic } from './modules/collections';
import { reducer as collectionItems, fetchItemsEpic } from './modules/collectionItems';
import thunk from 'redux-thunk';

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic,
  loadTokenEpic,
  fetchCollectionsEpic,
  fetchItemsEpic
);
const epicMiddleware = createEpicMiddleware(rootEpic);

const middlewares = [thunk, epicMiddleware];
const reducers = combineReducers({
  user,
  collections,
  collectionItems,
  form
})

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger');
  middlewares.push(logger());
}

export default createStore(reducers, applyMiddleware(...middlewares));