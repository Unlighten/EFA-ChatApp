import React from 'react'
import { StackNavigator } from "react-navigation"

import Home from './src/screens/home'
import Login from './src/screens/login'
import Title from './src/components/title'
import FinishProfile from './src/screens/finishProfile'
import LoadingScreen from './src/screens/loadingScreen'
import Channel from './src/screens/channel'

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig)

const App = StackNavigator(
  {
    LoadingScreen: { screen: LoadingScreen },
    Login: { screen: Login },
    Home: { screen: Home },
    FinishProfile: { screen: FinishProfile },
    Channel : { screen: Channel }
  },
  {
  navigationOptions: {
     header: <Title />
    }
  },
  {
    initialRouteName: 'LoadingScreen',
    headerMode: "none"
  }
);

export default class Main extends React.Component {
  render() {
    return (
          <App />
    );
  }
}
