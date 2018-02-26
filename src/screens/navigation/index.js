import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Channels from '../channels/index'
import Inbox from '../inbox/index'

const Home = TabNavigator(
  
  {
    Channels: { screen: Channels },
    Inbox: { screen: Inbox }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: TabBarBottom, 
    animationEnabled: false,
    initialRouteName: "Channels",
    swipeEnabled: false,
    lazy: true
  }
);

export default Home;