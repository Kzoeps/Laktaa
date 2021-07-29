import React, { useContext, useEffect, useState } from 'react';
import { Formik, FormikProps, FormikValues } from 'formik';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Error } from '@firebase/auth-types';
import { AuthContext } from './auth';
import FMTextInput from '../../shared/components/TextInput';
import { FIREBASE_CALLS } from './utils/API';
import { fetchUserProfile } from './store/authSlice';

const LoginScreen = ({ navigation }): JSX.Element => {
  const { loginWithEmail } = useContext(AuthContext);
  const [updateUserProfile, setUpdateUserProfile] = useState<boolean>(false);
  const [userEmail, setEmail] = useState<string>('');
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
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={({ email, password }) =>
          loginWithEmail(email, password)
            .then(() => {
              setEmail(email);
              setUpdateUserProfile(true);
            })
            .catch((error: Error) => {
              console.log(error);
            })
        }
      >
        {(
          formik: FormikProps<{
            email: string;
            password: string;
          }>
        ) => (
          <>
            <FMTextInput
              label="Email"
              name="email"
              formik={formik as unknown as FormikProps<FormikValues>}
              icon="person"
            />
            <FMTextInput
              label="Password"
              name="password"
              formik={formik as unknown as FormikProps<FormikValues>}
              icon="lock"
              doNotShow
            />
            <Button
              endIcon={
                <Icon as={<MaterialIcons name="arrow-forward" size="4" />} />
              }
              onPress={formik.handleSubmit}
              block
              light
            >
              Log In
            </Button>
          </>
        )}
      </Formik>
      <Text onPress={() => navigation.navigate('Sign Up')}>Go To Sign Up</Text>
    </View>
  );
};

export default LoginScreen;
