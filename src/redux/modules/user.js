const initialState = {
  loggedIn: true,
  user: {}
}

const actionTypes = {
  'LOGIN': 'LOGIN',
  'LOGOUT': 'LOGOUT'
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN:
      return {...state, loggedIn: true, user: action.user};
    case actionTypes.LOGOUT:
      return {...state, loggedIn: false, user: {}};
    default:
      return state
  }
}

const actions = {
  login: (user) => ({type: actionTypes.LOGIN, user}),
  logout: () => ({type: actionTypes.LOGOUT})
}

export default {actions, reducer}