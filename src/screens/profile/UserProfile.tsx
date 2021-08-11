import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Icon, Spinner } from 'native-base';
import { Formik, FormikProps, FormikValues } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import {
	selectStoreStatus,
	selectUserDetails,
	updateUserProfile as updateUserProfileStore,
} from '../auth/store/authSlice';
import { EDIT_PROFILE_SCHEMA } from './models/constants';
import FMTextInput from '../../shared/components/TextInput';
import { APIStatuses } from '../../shared/models/model';
import { UserDetails } from '../auth/models/models';

const UserProfile: FC = () => {
	const [inputsDisabled, setInputsDisabled] = useState(true);
	const userDetails = useSelector(selectUserDetails);
	const storeStatus = useSelector(selectStoreStatus);
	const dispatch = useDispatch();
	const initialValues = {
		name: userDetails?.userName ?? '',
		location: userDetails?.location ?? '',
		phoneNumber: userDetails?.phoneNumber ?? '',
	};
	const validationSchema = EDIT_PROFILE_SCHEMA;
	const updateUserProfile = async (userDetailsPayload: UserDetails) => {
		await dispatch(updateUserProfileStore(userDetailsPayload));
		setInputsDisabled(true);
	};

	if (storeStatus === APIStatuses.LOADING) return <Spinner accessibilityLabel='loading profile' />;
	return (
		<View>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={({ name: userName, phoneNumber, location }) => {
					updateUserProfile({ userName, phoneNumber, location, email: userDetails.email });
				}}
				onReset={() => {
					setInputsDisabled(true);
				}}
			>
				{(formik: FormikProps<{ name: string, phoneNumber: number, location: string }>) => (
					<>
						<Box>
							<FMTextInput disableInput={inputsDisabled} label='Name' name='name'
													 formik={formik as unknown as FormikProps<FormikValues>} />
							<FMTextInput disableInput={inputsDisabled} label='Location' name='location'
													 formik={formik as unknown as FormikProps<FormikValues>} />
							<FMTextInput disableInput={inputsDisabled} label='Phone Number' name='phoneNumber'
													 formik={formik as unknown as FormikProps<FormikValues>} />
						</Box>
						{
							inputsDisabled ? <Button endIcon={
								<Icon as={<MaterialIcons name='arrow-forward' size='4' />} />
							}
																			 onPress={() => setInputsDisabled(false)}
																			 light
							>Edit</Button> : <>
								<Button onPress={formik.handleSubmit}>Save</Button>
								<Button onPress={() => {
									formik.resetForm();
									setInputsDisabled(true);
								}}>Cancel</Button>
							</>
						}
					</>
				)}
			</Formik>
		</View>
	);
};

export default UserProfile;
