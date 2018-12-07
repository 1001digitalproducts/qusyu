/**
 * @flow
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import Routes from './routes';
import store from './store';

const AppContainer = createAppContainer(Routes);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
