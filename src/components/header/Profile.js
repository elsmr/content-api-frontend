import React from 'react';
import { Link } from 'react-router';

const Profile = ({user, onLogout}) => (
  <div className='dropdown'>
    <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
      {user.user.data.username}
    </button>
    <div className='dropdown-menu'>
      <h6 className='dropdown-header'>Profile</h6>
      <Link className='dropdown-item' to='profile' >Edit profile</Link>
      <a className='dropdown-item' href='#' onClick={onLogout}>Logout</a>
    </div>
  </div>
);

export default Profile;