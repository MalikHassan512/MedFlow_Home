/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigator from './src/navigator';
import { Provider } from 'react-redux';
import store from './src/store';
import { LogBox } from 'react-native';
import awsconfig from './src/aws-exports'
import Amplify from 'aws-amplify';

Amplify.configure(awsconfig)

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App : () => Node = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};


export default App;
