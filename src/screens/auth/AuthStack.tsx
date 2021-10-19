import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import SignUpPhone from './SignUpPhone';

const Stack = createStackNavigator();

const AuthStack = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={SignUpPhone} />
    <Stack.Screen
      name="Sign Up"
      component={SignUpScreen}
      options={{
        title: 'Sign Up',
        headerStyle: {
          backgroundColor: '#49C1A4',
        },
        headerTitleStyle: {
          color: '#FAFAFA',
        },
        headerTintColor: '#FAFAFA',
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
