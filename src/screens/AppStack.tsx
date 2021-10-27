import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import DashboardScreen from './dashboard/DashboardScreen';
import PostJob from './postjob/PostJob';
import JobDetails from './jobdetails/JobDetails';
import UserProfile from './profile/UserProfile';
import VehicleRegistration from './vehicle-registration/vehicle-registration';
import FMNavHeaderProfile from '../shared/components/HeaderProfileDisplay/FMNavHeaderProfile';
import HomeNavigation from '../shared/components/HeaderHomeNavigation/FMHomeNavigation';
import { fetchUserProfile, selectUserDetails } from './auth/store/authSlice';
import { AuthContext } from './auth/auth';
// eslint-disable-next-line import/named
import { AppStackParamList, RoutePaths } from '../shared/models/model';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = (): JSX.Element => {
  const [userInitials, setUserInitials] = useState('');
  const userDetails = useSelector(selectUserDetails);
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDetails?.userName) {
      if (currentUser.phoneNumber)
        dispatch(fetchUserProfile(currentUser.phoneNumber));
    }
  }, [userDetails?.userName, currentUser.phoneNumber, dispatch]);
  useEffect(() => {
    setUserInitials(
      userDetails?.userName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
    );
    return () => setUserInitials('');
  }, [userDetails?.userName]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RoutePaths.dashboard}
        component={DashboardScreen}
        options={({ navigation, route }) => ({
          headerTitle: 'Dashboard',
          headerRight: (props) => (
            <FMNavHeaderProfile
              phoneNumber={currentUser.phoneNumber}
              userInitials={userInitials}
              imageUri={userDetails?.profileImageUrl}
              navigation={navigation}
              route={route}
            />
          ),
        })}
      />
      <Stack.Screen
        name={RoutePaths.userProfile}
        component={UserProfile}
        options={({ navigation }) => ({
          title: 'My Profile',
          headerLeft: (props) => <HomeNavigation navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={RoutePaths.vehicleRegistration}
        options={({ navigation, route }) => ({
          headerTitle: 'Vehicle Registration',
          headerRight: (props) => (
            <FMNavHeaderProfile
              phoneNumber={currentUser.phoneNumber}
              imageUri={userDetails?.profileImageUrl}
              userInitials={userInitials}
              navigation={navigation}
              route={route}
            />
          ),
          headerLeft: (props) => <HomeNavigation navigation={navigation} />,
        })}
        component={VehicleRegistration}
      />
      <Stack.Screen
        name={RoutePaths.postJob}
        component={PostJob}
        options={({ navigation, route }) => ({
          headerTitle: 'Post Jobs',
          headerRight: (props) => (
            <FMNavHeaderProfile
              route={route}
              phoneNumber={currentUser.phoneNumber}
              imageUri={userDetails?.profileImageUrl}
              userInitials={userInitials}
              navigation={navigation}
            />
          ),
          headerLeft: (props) => <HomeNavigation navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={RoutePaths.jobDetails}
        component={JobDetails}
        options={({ navigation, route }) => ({
          headerTitle: 'Job Details',
          headerRight: (props) => (
            <FMNavHeaderProfile
              phoneNumber={currentUser.phoneNumber}
              imageUri={userDetails?.profileImageUrl}
              userInitials={userInitials}
              navigation={navigation}
              route={route}
            />
          ),
          headerLeft: (props) => <HomeNavigation navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
