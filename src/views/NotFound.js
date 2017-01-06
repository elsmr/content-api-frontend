import React from 'react';
import './Login.scss';
import { Link } from 'react-router';

const Login = () => (
	<div className="full-height center">
		<div className="container-fluid text-xs-center">
			<h1 className='display-3'>404 Not Found</h1>
			<p className='lead'>It seems you are lost</p>
			<p>
				<Link to="/" className="btn btn-primary">Go back home</Link>
			</p>
		</div>		
	</div>	
);

export default Login;