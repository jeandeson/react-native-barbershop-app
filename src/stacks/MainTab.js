import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

import Home from '../screens/home';
import Search from '../screens/search';
import Appointments from '../screens/appointments';
import Favorites from '../screens/favorites';
import Profile from '../screens/profile';
import CustomTabBar from '../components/CustomTabBar';

export default () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Appointments" component={Appointments} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
