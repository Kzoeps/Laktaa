import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './dashboard/DashboardScreen';
import PostJob from './postjob/PostJob';
import JobDetails from './jobdetails/JobDetails';
import UserProfile from './profile/UserProfile';
import { NAVIGATION_HEADER_CONFIG } from '../shared/models/constants';
import Calendar from '../shared/components/Calendar/calendar';

const Stack = createStackNavigator();

const AppStack = (): JSX.Element => (
  <Stack.Navigator>
    {/* <Stack.Screen name="Calendar" component={Calendar} /> */}
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen
      name="User Profile"
      component={UserProfile}
      options={{
        title: 'User Profile',
        ...NAVIGATION_HEADER_CONFIG,
      }}
    />
    <Stack.Screen name="PostJob" component={PostJob} />
    <Stack.Screen name="JobDetails" component={JobDetails} />
  </Stack.Navigator>
);

export default AppStack;
