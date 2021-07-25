import { Box, Button, Icon, Text } from 'native-base';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Formik, FormikProps, FormikValues } from 'formik';
import tailwind from 'tailwind-rn';
import firebase from 'firebase';
import { Image, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SIGN_UP_SCHEMA } from './models/constants';
import FMTextInput from '../../shared/components/TextInput';
import { AuthContext } from './auth';

const SignUpScreen: FC = () => {
  const { signUpWithEmail, currentUser } = useContext(AuthContext);
  const [shouldUpdateProfile, setShouldUpdateProfile] =
    useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('');
  const initialValues = {
    name: '',
    location: '',
    email: '',
    password: '',
  };
  const validationSchema = SIGN_UP_SCHEMA;

  useEffect(() => {
    if (shouldUpdateProfile) {
      const user: firebase.User | null = firebase.auth().currentUser;
      user?.updateProfile({ displayName })
        .catch((error: firebase.FirebaseError) => {
          console.error(error.message);
        });
    }
  }, [shouldUpdateProfile, currentUser, displayName]);

  return (
		<View style={tailwind('bg-blue-200 items-center')}>
			<Image style={tailwind('h-48 w-full')}
						 source={{ uri: 'https://cdn.dribbble.com/users/3961326/screenshots/10483213/media/711898708fb56c7d4bb4bc6cd7fcd956.jpg' }} />
			<View style={tailwind('h-full w-11/12 items-center')}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={({ email, password, name, location }) =>
						signUpWithEmail(email, password)
							.then(() => {
								setDisplayName(name);
								setShouldUpdateProfile(true);
							})
							.catch((error: firebase.FirebaseError) => {
								console.error(error.message);
							})
					}
				>
					{(
						formik: FormikProps<{
							email: string;
							password: string;
							name: string;
							location: string;
						}>,
					) => (
						<>
							<Box style={tailwind('mt-10 w-full items-center')}>
								<FMTextInput
									label='Name'
									name='name'
									formik={formik as unknown as FormikProps<FormikValues>}
									icon='person'
								/>
							</Box>
							<Box style={tailwind('mt-5 w-full items-center')}>
								<FMTextInput
									label='Location'
									name='location'
									formik={formik as unknown as FormikProps<FormikValues>}
									icon='place'
								/>
							</Box>
							<Box style={tailwind('mt-5 w-full items-center')}>
								<FMTextInput
									label='Email'
									name='email'
									formik={formik as unknown as FormikProps<FormikValues>}
									icon='email'
								/>
							</Box>
							<Box style={tailwind('mt-5 w-full items-center')}>
								<FMTextInput
									label='Password'
									formik={formik as unknown as FormikProps<FormikValues>}
									name='password'
									icon='lock'
									doNotShow
								/>
							</Box>
							<Box style={tailwind('mt-6 w-3/6')}>
								<Button
									endIcon={<Icon as={<MaterialIcons name="arrow-forward" size="4"/>}/>}
									onPress={formik.handleSubmit} block light>
									Sign Up
								</Button>
							</Box>
						</>
					)}
				</Formik>
			</View>
		</View>
  );
};

export default SignUpScreen;
