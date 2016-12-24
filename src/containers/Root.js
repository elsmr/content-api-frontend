import React from 'react';
import {Provider} from 'react-redux';
import App from './App';

const Root = ({store, actions}) => (
  <Provider store={store}>
    <App actions={actions} />
  </Provider>
);

export default Root;