import React from 'react';
import './PageTitle.scss';

const Header = ({title}) => (
  <div className="page-title bg-primary">
    <h1 className='display-4 font-weight-bold text-xs-center text-white'>{title}</h1>
  </div>
);

export default Header;