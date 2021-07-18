import { Button, Container, Text } from 'native-base';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Formik, FormikProps, FormikValues } from 'formik';
import tailwind from 'tailwind-rn';
import firebase from 'firebase';
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
      user
        ?.updateProfile({ displayName })
        .catch((error: firebase.FirebaseError) => {
          console.error(error.message);
        });
    }
  }, [shouldUpdateProfile, currentUser, displayName]);

  return (
    <Container style={tailwind('bg-blue-200')}>
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
          }>
        ) => (
          <>
            <FMTextInput
              label="Name"
              name="name"
              formik={formik as unknown as FormikProps<FormikValues>}
              icon="person"
            />
            <FMTextInput
              label="Location"
              name="location"
              formik={formik as unknown as FormikProps<FormikValues>}
              icon="place"
            />
            <FMTextInput
              label="Email"
              name="email"
              formik={formik as unknown as FormikProps<FormikValues>}
              icon="email"
            />
            <FMTextInput
              label="Password"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="password"
              icon="lock"
              show={false}
            />
            <Button onPress={formik.handleSubmit} block light>
              <Text>Sign Up</Text>
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default SignUpScreen;
