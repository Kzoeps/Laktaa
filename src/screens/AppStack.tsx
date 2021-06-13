import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './auth/SignUpScreen';

const Stack = createStackNavigator();

const AppStack = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Sign Up" component={SignUpScreen} />
  </Stack.Navigator>
);

export default AppStack;
