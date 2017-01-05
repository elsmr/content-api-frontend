import React from 'react';
import NavLink from './NavLink';
import NavButton from './NavButton';

const Nav = ({user, onLogout}) => (
  <div className="nav-right">
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/collections'>Collections</NavLink>
    <NavLink to='/media'>Media</NavLink>
    { user.loggedIn ?
      <NavButton onClick={() => {onLogout()}}>Logout</NavButton> :
      <NavButton to="/login">Login</NavButton>
    }
  </div>
);

export default Nav;
