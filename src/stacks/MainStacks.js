import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PreLoad from '../screens/preload';
import SignIn from '../screens/singin';
import SignUp from '../screens/signup';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="preload"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="preload" component={PreLoad} />
    <Stack.Screen name="signin" component={SignIn} />
    <Stack.Screen name="signup" component={SignUp} />
  </Stack.Navigator>
);
