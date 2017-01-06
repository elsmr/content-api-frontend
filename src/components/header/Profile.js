import React from 'react';
import { Link } from 'react-router';

const Profile = ({user : { user }, onLogout}) => (
  <div className='dropdown bg-primary'>
    <button className='btn btn-primary dropdown-toggle profile-dropdown' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
      <img src={user.avatar_url ? user.avatar_url : `https://placeholdit.imgix.net/~text?txtsize=65&txt=${user.username.toUpperCase()[0]}&w=100&h=100`} alt="Your avatar" className="rounded-circle profile-avatar" />
      <span className="profile-username">{user.username}</span>
    </button>
    <div className='dropdown-menu'>
      <h6 className='dropdown-header'>{ user.permissions.admin ? 'Administrator' : 'Profile'}</h6>
      <Link className='dropdown-item' to='profile' >Edit profile</Link>
      {user.permissions.admin && <Link className='dropdown-item' to='users/manage'>Manage users</Link>}
      <a className='dropdown-item' href='#' onClick={onLogout}>Logout</a>
    </div>
  </div>
);

export default Profile;