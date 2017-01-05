import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => (
	<Link {...props} className='nav-item' activeClassName='is-active'>{props.children}</Link>
);

export default NavLink;