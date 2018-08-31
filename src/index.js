/**
 * @flow
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
