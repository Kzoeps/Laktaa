import React,{ FC, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import { selectUserDetails } from '../auth/store/authSlice';

const UserProfile: FC = () => {
	const userDetails = useSelector(selectUserDetails);
	if (!userDetails.userName) return <Spinner accessibilityLabel='loading profile'/>
	return (
		<View>
		</View>
	)
}

export default UserProfile;
