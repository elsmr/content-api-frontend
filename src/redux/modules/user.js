import { auth } from '../../utils/apiClient';
import jwt from '../../utils/jwt';

export const initialState = {
  prevUrl: '/',
  loggedIn: false,
  fetching: false,
  user: {
    avatar_url: null,
    username: null,
    id: null,
    permissions: {}
  }
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
    const token = jwt.getDecoded();
    console.log(token)
    if(token) {
      dispatch(loadTokenFulfilled(token.data));
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
          let token = json.data;
          if(token) {
            jwt.store(token)
            let decoded = jwt.decode(token);
            dispatch(loginFulfilled(decoded.data));
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