import React from 'react';
import Nav from './Nav';
import logo from '../assets/logo.svg';

const Header = ({user, actions}) => (
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React</h2>
    <Nav user={user} actions={actions} />
  </div>
);

export default Header;
