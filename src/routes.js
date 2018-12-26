/**
 * @flow
 */
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '@screens/Home';
import DetailScreen from '@screens/Detail';
import AboutScreen from '@screens/About';

const StackWithHeaderPreset = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
  About: AboutScreen,
});

export default StackWithHeaderPreset;
