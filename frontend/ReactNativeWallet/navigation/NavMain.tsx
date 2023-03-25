/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Landing from '../screens/Landing';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Applications from '../screens/Application';
import Wallet from '../screens/Wallet';
import Send from '../screens/Send';

import AppsButton from '../components/AppsButton';

const Stack = createNativeStackNavigator();

const NavMain = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{height: '100%'}}>
        <Stack.Navigator>
          <Stack.Group
            screenOptions={{headerTitle: 'OPCLAVE', headerShown: false}}>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Menu" component={Wallet} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="Send"
              component={Send}
              options={{header: () => <View />}}
            />
            <Stack.Screen
              name="Swap"
              options={{header: () => <AppsButton />}}
              component={Applications}
            />
          </Stack.Group>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default NavMain;
