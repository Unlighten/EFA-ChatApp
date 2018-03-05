import React from "react";
import { TabNavigator } from "react-navigation";

import Channels from '../channels'
import Inbox from '../inbox'

const Home = TabNavigator(
  
  {
    Channels: { screen: Channels },
    Inbox: { screen: Inbox },
  },
  {
    tabBarPosition: "bottom",
    initialRouteName: "Channels"
  }
);

export default Home;