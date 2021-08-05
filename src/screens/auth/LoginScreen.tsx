import React, { useContext, useEffect, useState } from 'react';
import { Formik, FormikProps, FormikValues } from 'formik';
import { ImageBackground, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Error } from '@firebase/auth-types';
import { AuthContext } from './auth';
import FMTextInput from '../../shared/components/TextInput';
import { fetchUserProfile } from './store/authSlice';
import tailwind from 'tailwind-rn';

const LoginScreen = ({ navigation }): JSX.Element => {
	const { loginWithEmail } = useContext(AuthContext);
	const [updateUserProfile, setUpdateUserProfile] = useState<boolean>(false);
	const [userEmail, setEmail] = useState<string>('');
	const [pending, setPending] = useState<boolean>(false);
	const initialValues = {
		email: '',
		password: '',
	};
	const dispatch = useDispatch();

	useEffect(() => {
		if (updateUserProfile) {
			dispatch(fetchUserProfile(userEmail));
			setUpdateUserProfile(false);
		}
	}, [
		updateUserProfile,
		userEmail,
		setUpdateUserProfile,
		initialValues.email,
		dispatch,
	]);
	return (
		<View style={{ flex: 1 }}>
			{/* eslint-disable-next-line global-require */}
			<ImageBackground
				source={require('../../assets/thimphu-bg.jpeg')}
				blurRadius={2}
				resizeMode='cover'
				style={{ flex: 1 }}
			>
				<View style={tailwind('items-center h-full')}>
					<Formik
						initialValues={initialValues}
						onSubmit={({ email, password }) => {
							setPending(true);
							loginWithEmail(email, password)
								.then(() => {
									setEmail(email);
									setUpdateUserProfile(true);
								})
								.catch((error: Error) => {
									console.log(error);
								})
								.finally(() => {
									setPending(false);
								});
						}}
					>
						{(
							formik: FormikProps<{
								email: string;
								password: string;
							}>,
						) => (
							<View style={tailwind('h-full w-11/12 mt-32 items-center')}>
								<FMTextInput
									label='Email'
									name='email'
									formik={formik as unknown as FormikProps<FormikValues>}
									icon='person'
								/>
								<FMTextInput
									styleProp='mt-10'
									label='Password'
									name='password'
									formik={formik as unknown as FormikProps<FormikValues>}
									icon='lock'
									doNotShow
								/>
								<Button
									style={tailwind('mt-10 w-11/12 rounded-lg')}
									isLoading={pending}
									endIcon={
										<Icon
											as={<MaterialIcons name='arrow-forward' size={4} />}
										/>
									}
									onPress={formik.handleSubmit}
									block
									light
								>
									Log In
								</Button>
								<View style={tailwind( 'flex flex-row h-full w-11/12 items-center ')}>
									<Text style={tailwind('h-44 flex-auto w-3/6 mb-8 text-white text-right')}>
										Dont have an account?
									</Text>
									<Text style={tailwind('h-44 flex-auto w-8 text-green-400 text-left ml-2 mb-8 mr-8 font-bold')} onPress={() => navigation.navigate('Sign Up')}>
										Sign Up
									</Text>
								</View>
							</View>
						)}
					</Formik>
				</View>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;
