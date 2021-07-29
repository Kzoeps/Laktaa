import React, { useContext, useEffect, useState } from 'react';
import { Formik, FormikProps, FormikValues } from 'formik';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AuthContext } from './auth';
import FMTextInput from '../../shared/components/TextInput';
import { getUserProfile, selectUserDetails } from './store/authSlice';

const LoginScreen = ({ navigation }): JSX.Element => {
  const { signInWithEmail } = useContext(AuthContext);
  const [updateUserProfile, setUpdateUserProfile] = useState<boolean>(false);
  const [userEmail, setEmail] = useState<string>('');
  const initialValues = {
    email: '',
    password: '',
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateUserProfile) {
      dispatch(getUserProfile(initialValues.email));
      setUpdateUserProfile(false);
    }
  }, [updateUserProfile, setUpdateUserProfile, initialValues.email, dispatch]);
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={({ email, password }) =>
          signInWithEmail(email, password).then(() => {
            setEmail(email);
            setUpdateUserProfile(true);
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
          </>
        )}
      </Formik>
      <Text onPress={() => navigation.navigate('Sign Up')}>Go To Sign Up</Text>
    </View>
  );
};

export default LoginScreen;
