import React from 'react';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';


import Page from './Page';
import Home from '../views/Home';
import Collections from '../views/Collections';

class App extends React.Component {
  render() {
    const createElement = (Component, props) => {
      return <Component actions={this.props.actions} {...props} />;
    };
    return (
      <Router history={browserHistory} createElement={createElement}>
        <Route path="/" component={Page}>
          <IndexRoute component={Home} />
          <Route path="collections" component={Collections} />
        </Route>
      </Router>
    );
  }
}

export default App;
