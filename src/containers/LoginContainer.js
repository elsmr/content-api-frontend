import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LoginForm from '../components/forms/LoginForm';

class LoginContainer extends React.Component {
  componentWillUpdate(nextProps) {
    if(nextProps.user.loggedIn) {
      browserHistory.replace(nextProps.user.prevUrl);
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