import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LoginForm from '../components/LoginForm';

class LoginContainer extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.user.loggedIn) {
      browserHistory.replace('/');
    }
  }

  render() {
    return (
      <LoginForm />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(LoginContainer);