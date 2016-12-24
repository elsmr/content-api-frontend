import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import {store, actions} from './redux/confStore'
import './index.scss';

ReactDOM.render(
  <Root actions={actions} store={store} />,
  document.getElementById('root')
);
