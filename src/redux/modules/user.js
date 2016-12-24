const initialState = {
  loggedIn: false,
  user: {}
}

const actionTypes = {
  'LOGIN': 'LOGIN',
  'LOGOUT': 'LOGOUT'
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN:
      console.log(action)
      return Object.assign(state,{loggedIn: true, user: action.user});
    case actionTypes.LOGOUT:
      return Object.assign(state,{loggedIn: false, user: {}});
    default:
      return state;
  }
}

const actions = {
  login: (user) => ({type: actionTypes.LOGIN, user}),
  logout: () => ({type: actionTypes.LOGOUT})
}

export default {actions, reducer}