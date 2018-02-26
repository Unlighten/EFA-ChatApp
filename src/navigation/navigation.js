import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Channels from '../screens/channels/index'
import Inbox from '../screens/inbox/index'

const Navigation = TabNavigator(
  
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

export default Navigation;