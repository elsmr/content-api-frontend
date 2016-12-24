import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header.js';

import './Page.scss';

class Page extends React.Component {
  render() {
    const {user, actions} = this.props;
    return (
      <div className='App'>
        <Header user={user} actions={actions} />
        <div className='App-intro'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Page);