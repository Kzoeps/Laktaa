import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './dashboard/DashboardScreen';
import PostJob from './postjob/PostJob';

const Stack = createStackNavigator();

const AppStack = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="PostJob" component={PostJob} />
  </Stack.Navigator>
);

export default AppStack;
