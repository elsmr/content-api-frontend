import React from 'react';
import Nav from './Nav';

const Header = ({ title, user, onLogout}) => (
  <div className='header'>
  	
	<nav className='nav has-shadow'>
		<div className="container">
			<div className='nav-left'>
				<a href='/' className='is-brand nav-item'>
					{title}
				</a>
			</div>
			<Nav user={user} onLogout={onLogout} />
		</div>
	</nav>
  </div>
);

export default Header;
