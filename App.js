import React from 'react'
import { StackNavigator } from "react-navigation"

import Navigation from './src/navigation/navigation'
import Landing from './src/screens/landing/index'


const App = StackNavigator(
  {
    Landing: { screen: Landing },
    Navigation: { screen: Navigation }
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
