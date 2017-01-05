import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setPrevUrl } from '../redux/modules/user';

class AuthContainer extends React.Component {
  componentWillMount() {
    const { dispatch, url, user: { loggedIn }} = this.props

    if (!loggedIn) {
      dispatch(setPrevUrl(url));
      browserHistory.replace("/login");
    }
  }

  render() {
    const { loggedIn, children } = this.props;
    return loggedIn ? children : null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    url: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(AuthContainer)