import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as user } from './modules/user';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const reducers = combineReducers({
  user,
  form: formReducer
})

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger');
  middlewares.push(logger());
}

export default createStore(reducers, applyMiddleware(...middlewares));