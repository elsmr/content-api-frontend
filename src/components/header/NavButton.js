import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => (
	<Link {...props} className='btn btn'>{props.children}</Link>
);

export default NavLink;