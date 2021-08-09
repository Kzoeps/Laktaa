import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './dashboard/DashboardScreen';
import UserProfile from './profile/UserProfile';
import { NAVIGATION_HEADER_CONFIG } from '../shared/models/constants';

const Stack = createStackNavigator();

const AppStack = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
		<Stack.Screen name="User Profile" component={UserProfile} options={{
			title: 'User Profile',
			...NAVIGATION_HEADER_CONFIG
		}}/>
  </Stack.Navigator>
);

export default AppStack;
