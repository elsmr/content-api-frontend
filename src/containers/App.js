import React from 'react';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import { connect } from 'react-redux';
import { loadToken } from '../redux/modules/user'

import Layout from './Layout';
import AuthContainer from './AuthContainer';
import Home from '../views/Home';
import Collections from '../views/Collections';
import CollectionDetail from '../views/CollectionDetail'
import Login from '../views/Login';
import NotFound from '../views/NotFound';

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(loadToken());
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <Route component={AuthContainer}>
            <IndexRoute component={Home} />
            <Route path='collections'>
              <IndexRoute component={Collections} />
              <Route path=':name' component={CollectionDetail} />
            </Route>
          </Route>          
        </Route>
        <Route path='/login' component={Login} />
        <Route path="*" component={NotFound}/>
      </Router>
    );
  }
}

export default connect()(App);
