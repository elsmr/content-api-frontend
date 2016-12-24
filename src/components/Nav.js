import React from 'react';
import {Link} from 'react-router';

const Nav = ({user, actions}) => (
  <div className="navbar">
    <Link to='/' className="link" activeClassName="active">Home</Link>
    <Link to='/collections' className="link" activeClassName="active">Collections</Link>
    { user.loggedIn ?
      <button onClick={actions.user.logout}>Logout</button> :
      <button onClick={actions.user.login}>Login</button>
    }
  </div>
);

export default Nav
