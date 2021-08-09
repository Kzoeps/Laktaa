import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Spinner } from 'native-base';
import { Formik, FormikProps, FormikValues } from 'formik';
import { selectUserDetails } from '../auth/store/authSlice';
import { EDIT_PROFILE_SCHEMA } from './models/constants';
import FMTextInput from '../../shared/components/TextInput';

const UserProfile: FC = () => {
	const userDetails = useSelector(selectUserDetails);
	const initialValues = {
		name: userDetails?.userName ?? '',
		location: userDetails?.location ?? '',
		phoneNumber: userDetails?.phoneNumber ?? '',
	};
	const validationSchema = EDIT_PROFILE_SCHEMA;

	if (!userDetails.userName) return <Spinner accessibilityLabel='loading profile' />;
	return (
		<View>
			<Text>
				{userDetails.userName} {userDetails.location}
			</Text>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={({ name, password, location }) => {
					console.log(name, password, location);
				}}
			>
				{(formik: FormikProps<{ name: string, phoneNumber: number, location: string }>) => (
					<>
						<Box>
							<FMTextInput label='Name' name='name' formik={formik as unknown as FormikProps<FormikValues>} />
							<FMTextInput label='Location' name='location' formik={formik as unknown as FormikProps<FormikValues>} />
							<FMTextInput label='Phone Number' name='phoneNumber'
													 formik={formik as unknown as FormikProps<FormikValues>} />
						</Box>
					</>
				)}
			</Formik>
			<Text>
				It wroks
			</Text>
		</View>
	);
};

export default UserProfile;
