import React from 'react'
import { StackNavigator } from "react-navigation"

import Home from './src/screens/home'
import Landing from './src/screens/landing'
import Title from './src/components/title'

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig)

const App = StackNavigator(
  {
    Landing: { screen: Landing },
    Home: { screen: Home }
  },
  {
  navigationOptions: {
     header: <Title />
    }
  },
  {
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
