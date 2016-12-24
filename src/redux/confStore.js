import {createStore, bindActionCreators, combineReducers, applyMiddleware} from 'redux';
import apiMiddleware from './middlewares/api'
import user from './modules/user';

const allReducers = combineReducers({
  user: user.reducer
})

const store = createStore(allReducers, applyMiddleware(apiMiddleware));

const actions = {
  user: bindActionCreators(user.actions, store.dispatch)
}

export {store, actions};