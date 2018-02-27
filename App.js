import React from 'react'
import { StackNavigator } from "react-navigation"

import Home from './src/screens/navigation/index'
import Landing from './src/screens/landing/index'

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig)

const App = StackNavigator(
  {
    Landing: { screen: Landing },
    Home: { screen: Home }
  },
  {
    index: 0,
    initialRouteName: 'Landing',
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
