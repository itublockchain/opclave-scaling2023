import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Wallet from '../screens/Wallet';

import AppsButton from '../components/AppsButton';
import SendButton from '../components/SendButton';
import GuardButton from '../components/GuardButton';
import BrowserButton from '../components/BrowserButton';

import Applications from '../screens/Application';
import NotAvailable from '../screens/NotAvailable';

const Tab = createBottomTabNavigator();

const NavTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: 'Wallet',
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: () => <SendButton />,
          tabBarActiveBackgroundColor: 'pink',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Apps"
        component={Applications}
        options={{
          tabBarLabel: 'Apps',
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: () => <AppsButton />,
          tabBarActiveBackgroundColor: 'pink',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Browser"
        component={NotAvailable}
        options={{
          tabBarLabel: 'Browser',
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: () => <BrowserButton />,
          tabBarActiveBackgroundColor: 'pink',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Guardians"
        component={NotAvailable}
        options={{
          tabBarLabel: 'Guardians',
          tabBarLabelPosition: 'beside-icon',
          tabBarIcon: () => <GuardButton />,
          tabBarActiveBackgroundColor: 'pink',
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default NavTab;
