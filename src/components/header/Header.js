import React from 'react';
import NavLink from './NavLink';
import Profile from './Profile';
import './Header.scss';

const Header = ({title, user, onLogout}) => (
  <nav className='navbar navbar-dark bg-primary'>    
    <div className='container'>
      { user.loggedIn &&
        <div className='float-xs-right'>
          <Profile user={user} onLogout={onLogout} />
        </div>     
      }
      <div>
        <div className='clearfix float-sm-left'>
          <button className='navbar-toggler hidden-sm-up float-xs-left' type='button' data-toggle='collapse' data-target='#collapsingNavbar' aria-controls='collapsingNavbar' aria-expanded='false' aria-label='Toggle navigation'></button>
          <a className='navbar-brand d-block' href='/'>{title}</a>
        </div>        
        <div className='collapse navbar-toggleable-xs' id='collapsingNavbar'>
          <div className='nav navbar-nav'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/collections'>Collections</NavLink>
            <NavLink to='/media'>Media</NavLink>
          </div>
        </div>
      </div>
    </div>
  </nav>    
);

export default Header;