import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'src/screens/auth/LoginScreen.tsx.ts';
import SignUpScreen from 'src/screens/auth/SignUpScreen.tsx.ts';

const Stack = createStackNavigator();

const AuthStack = (): JSX.Element => (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
);

export default AuthStack;
