import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import DashboardScreen from './dashboard/DashboardScreen';
import PostJob from './postjob/PostJob';
import JobDetails from './jobdetails/JobDetails';
import UserProfile from './profile/UserProfile';
import VehicleRegistration from './vehicle-registration/vehicle-registration';
import FMNavHeaderProfile from '../shared/components/HeaderProfileDisplay/FMNavHeaderProfile';
import { fetchUserProfile, selectUserDetails } from './auth/store/authSlice';
import { AuthContext } from './auth/auth';

const Stack = createStackNavigator();

const AppStack = (): JSX.Element => {
	const [userInitials, setUserInitials] = useState('');
	const userDetails = useSelector(selectUserDetails);
	const { currentUser } = useContext(AuthContext)
	const dispatch = useDispatch();

	useEffect(() => {
		if (!userDetails.userName) {
			if (currentUser.email) dispatch(fetchUserProfile(currentUser.email));
		}
	}, [userDetails.userName]);

	return (
		<Stack.Navigator>
			{/* <Stack.Screen name="Calendar" component={Calendar} /> */}
			<Stack.Screen name='Dashboard' component={DashboardScreen} options={({ navigation }) => ({
				headerTitle: 'Dashboard',
				headerRight: props => <FMNavHeaderProfile imageUri={userDetails?.profileImageUrl} userInitials={userInitials} navigation={navigation} />,
			})} />
			<Stack.Screen
				name='User Profile'
				component={UserProfile}
				options={{
					title: 'My Profile'
				}}
			/>
			<Stack.Screen
				name='Vehicle Registration'
				options={({ navigation }) => ({
					headerTitle: 'Vehicle Registration',
					headerRight: props => <FMNavHeaderProfile imageUri={userDetails?.profileImageUrl} userInitials={userInitials} navigation={navigation} />,
				})}
				component={VehicleRegistration}
			/>
			<Stack.Screen name='PostJob' component={PostJob}
										options={({ navigation }) => ({
											headerTitle: 'Post Jobs',
											headerRight: props => <FMNavHeaderProfile imageUri={userDetails?.profileImageUrl} userInitials={userInitials} navigation={navigation} />,
										})}
			/>
			<Stack.Screen name='JobDetails' component={JobDetails}
										options={({ navigation }) => ({
											headerTitle: 'Job Details',
											headerRight: props => <FMNavHeaderProfile imageUri={userDetails?.profileImageUrl} userInitials={userInitials} navigation={navigation} />,
										})}
			/>
		</Stack.Navigator>);
};

export default AppStack;
