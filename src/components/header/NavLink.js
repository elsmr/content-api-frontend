import React from 'react';
import { Link } from 'react-router';

class NavLink extends React.Component {
  render() {
    const isActive = this.context.router.isActive(this.props.to, true);
    return (
      <li className={'nav-item' + ( isActive ? ' active' : '')}>
        <Link {...this.props} className='nav-link'>{this.props.children} { isActive && <span className='sr-only'>(current)</span>}</Link>
      </li>
    );
  }
}

NavLink.contextTypes = {
  router: React.PropTypes.object
};

export default NavLink;