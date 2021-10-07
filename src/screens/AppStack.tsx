import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './dashboard/DashboardScreen';
import PostJob from './postjob/PostJob';
import JobDetails from './jobdetails/JobDetails';
import UserProfile from './profile/UserProfile';
import VehicleRegistration from './vehicle-registration/vehicle-registration';

const Stack = createStackNavigator();

const AppStack = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen
      name="User Profile"
      component={UserProfile}
      options={{
        title: 'User Profile',
      }}
    />
    <Stack.Screen
      name="Vehicle Registration"
      options={{
        title: 'Vehicle Registration',
      }}
      component={VehicleRegistration}
    />
    <Stack.Screen name="PostJob" component={PostJob} />
    <Stack.Screen name="JobDetails" component={JobDetails} />
  </Stack.Navigator>
);

export default AppStack;
