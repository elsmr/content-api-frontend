import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/header/Header.js';
import { logout } from '../redux/modules/user'

import './Layout.scss';

class Layout extends React.Component {
  render() {
    const { user, onLogout, message } = this.props;
    return (
      <div>
        {message &&
          <div className="alert alert-warning">
            {message}
          </div>
        }
        <Header title='Capi' user={user} onLogout={onLogout} />        
          {
            React.Children
              .map(this.props.children, child => React.cloneElement(child, {...child.props, user}))
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);