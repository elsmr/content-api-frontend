import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../containers/Root';
import {store, actions} from '../redux/confStore'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root actions={actions} store={store} />, div);
});
