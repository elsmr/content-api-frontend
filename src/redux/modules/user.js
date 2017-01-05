import { auth } from '../../utils/apiClient';
import jwt from '../../utils/jwt';

const initialState = {
  prevUrl: '/',
  loggedIn: false,
  fetching: false,
  user: {}
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_PENDING':
      return {...state, fetching: true};
    case 'LOGIN_FULFILLED':
      return {...state, fetching: false, loggedIn: true, user: action.user};
    case 'LOGIN_REJECTED':
      return {...state, fetching: false};
    case 'LOGOUT':
      return {...state, loggedIn: false, user: {}};
    case 'SET_PREV_URL':
      return {...state, prevUrl: action.url};
    case 'LOAD_TOKEN_FULFILLED':
      return {...state, loggedIn: true, user: action.user}
    default:
      return state;
  }
}

// actions
export const loginPending = () => ({ type: 'LOGIN_PENDING'});
export const loginRejected = () => ({ type: 'LOGIN_REJECTED'});
export const loginFulfilled = (user) => ({ type: 'LOGIN_FULFILLED', user});
export const setPrevUrl = (url) => ({type: 'SET_PREV_URL', url});
export const loadTokenFulfilled = (user) => ({type: 'LOAD_TOKEN_FULFILLED', user});
export const logout = () => {
  jwt.remove();
  return { type: 'LOGOUT' };
};

export const loadToken = () => {
  return (dispatch) => {
    const user = jwt.getDecoded();
    if(user) {
      dispatch(loadTokenFulfilled(user));
      return true;
    }
    return false;
  };
};

export const login = (user) => {
  return (dispatch) => {
    dispatch(loginPending());
    return new Promise((resolve, reject) => {
      auth(user)
        .then((res) => {
          setTimeout(1000);
          if(res.status !== 200) {
            dispatch(loginRejected());
            reject();            
          }
          return res.json();
        })
        .then((json) => {
          if(json.data) {
            jwt.store(json.data)
            let user = jwt.decode(json.data);
            dispatch(loginFulfilled(user));
            resolve()
          }          
        })
        .catch((err) => {
          dispatch(loginRejected());
          reject();
        });
    }); 
  };
};