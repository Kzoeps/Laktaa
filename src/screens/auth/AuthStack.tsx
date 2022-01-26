import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import SignUpPhone from './SignUpPhone';

const Stack = createStackNavigator();

const AuthStack = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen
      name="Sign Up"
      component={SignUpPhone}
      options={{
        title: 'Sign Up',
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
