import React from 'react';
import NavLink from './NavLink';
import Profile from './Profile';
import './Header.scss';

const Header = ({title, user, onLogout}) => (
  <nav className="navbar navbar-dark bg-primary">
  <div className="container">
    <a className="navbar-brand" href="/">{title}</a>
    <ul className="nav navbar-nav">
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/collections'>Collections</NavLink>
      <NavLink to='/media'>Media</NavLink>
      { user.loggedIn &&
        <div className="float-xs-right">
          <Profile user={user} onLogout={onLogout} />
        </div>     
      }
    </ul>
  </div>  
  </nav>    
);

export default Header;