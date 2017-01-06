import { auth } from '../../utils/apiClient';
import jwt from '../../utils/jwt';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

export const initialState = {
  prevUrl: '/',
  loggedIn: false,
  user: {
    avatar_url: null,
    username: null,
    id: null,
    permissions: {}
  }
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_FULFILLED':
      return {...state, loggedIn: true, user: action.user};
    case 'LOGOUT':
      return {...state, loggedIn: false, user: {}};
    case 'SET_PREV_URL':
      return {...state, prevUrl: action.url};
    default:
      return state;
  }
}

// actions
export const loginPending = () => ({ type: 'LOGIN_PENDING'});
export const loginRejected = () => ({ type: 'LOGIN_REJECTED'});
export const loginFulfilled = (user) => ({ type: 'LOGIN_FULFILLED', user});
export const setPrevUrl = (url) => ({type: 'SET_PREV_URL', url});
export const loadToken = () => ({type: 'LOAD_TOKEN'});
export const login = (user, resolve, reject) => ({ type: 'LOGIN', user, resolve, reject });
export const logout = () => ({ type: 'LOGOUT' });

// epics
export const loadTokenEpic = action$ => 
  action$.ofType('LOAD_TOKEN')
    .map(action => jwt.getDecoded())
    .filter(decoded => decoded)
    .map(decoded => decoded.data)
    .map(user => loginFulfilled(user))

export const loginEpic = action$ =>
  action$.ofType('LOGIN')
    .mergeMap(action =>
      auth(action.user)
        .map(res => res.response.data)
        .map(token => {
          jwt.store(token)
          return jwt.decode(token)
        })
        .filter(decoded => decoded)
        .map(decoded => decoded.data)
        .map(user => {
          action.resolve();
          return loginFulfilled(user);
        })
        .catch(error => {
          action.reject();
          return Observable.of(loginRejected());
        })
    );