import { Formik, FormikProps, FormikValues } from 'formik';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Heading, Icon, Spinner } from 'native-base';
import firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { ApplicationVerifier } from '@firebase/auth-types';
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Image, ScrollView, View } from 'react-native';
import { AuthContext } from './auth';
import FMTextInput from '../../shared/components/TextInput';
import { SignUpForm } from './models/models';
import { setUserDetails as updateUserDetails } from './store/authSlice';
import { selectStoreStatus } from '../../shared/utils';
import { APIStatuses, RootReducersEnum } from '../../shared/models/model';
import { SIGN_UP_FORM, SIGN_UP_PHONE_SCHEMA } from './models/constants';

const SignUpPhone: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [verificationId, setVerificationId] = useState<string>('');
  const [showLocalLoader, setShowLocalLoader] = useState(false);
  const [pendingRegistration, setPendingRegistration] = useState(false);
  const status = useSelector(selectStoreStatus(RootReducersEnum.authSlice));
  const recaptchaVerifier = useRef(null);
  const initialValues = SIGN_UP_FORM;
  const validationSchema = SIGN_UP_PHONE_SCHEMA;
  const dispatch = useDispatch();

  const updateUserProfile = async (displayName: string) => {
    const user: firebase.User | null = firebase.auth().currentUser;
    if (user) await user?.updateProfile({ displayName });
  };

  const sendVerification = (phoneNumber: string) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    setShowLocalLoader(true);
    phoneProvider
      .verifyPhoneNumber(
        `+975${phoneNumber}`,
        recaptchaVerifier.current as unknown as ApplicationVerifier
      )
      .then((id) => {
        setVerificationId(id);
      })
      .finally(() => {
        setShowLocalLoader(false);
      });
  };

  const confirmCode = async (code: string) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    try {
      await firebase.auth().signInWithCredential(credential);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(
    () => () => {
      setPendingRegistration(false);
    },
    []
  );

  const handleSubmit = async (formValues: SignUpForm) => {
    const { verificationCode, name, phoneNumber, location } = formValues;
    await confirmCode(verificationCode);
    // const user = firebase.auth().currentUser;
    await updateUserProfile(name);
    await dispatch(
      updateUserDetails({
        phoneNumber: `+975${phoneNumber}`,
        location,
        userName: name,
        registeredDriver: false,
      })
    );
  };
  if (status === APIStatuses.LOADING) {
    return (
      <View style={tailwind('my-24')}>
        <Spinner
          accessibilityLabel="Loading posts"
          color="emerald.500"
          size="lg"
        />
        <Heading
          style={tailwind('text-center')}
          color="emerald.500"
          fontSize="xl"
        >
          Loading ...
        </Heading>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={[
          tailwind('w-full h-full'),
          { backgroundColor: 'rgba(73, 193, 164, 0.9)' },
        ]}
      >
        <View style={tailwind('items-center')}>
          <Image
            style={tailwind('h-48 w-full mb-5')}
            source={{
              uri: 'https://cdn.dribbble.com/users/3961326/screenshots/10483213/media/711898708fb56c7d4bb4bc6cd7fcd956.jpg',
            }}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (formValues) => {
              await handleSubmit(formValues);
            }}
          >
            {(formik: FormikProps<SignUpForm>) => (
              <>
                <Box style={tailwind('mt-10 w-full items-center')}>
                  <FMTextInput
                    label="Name"
                    name="name"
                    formik={formik as unknown as FormikProps<FormikValues>}
                    icon="person"
                    placeholderTextColor="white"
                  />
                </Box>
                <Box style={tailwind('mt-6 w-full items-center')}>
                  <FMTextInput
                    placeholderTextColor="white"
                    label="Location"
                    name="location"
                    formik={formik as unknown as FormikProps<FormikValues>}
                    icon="place"
                  />
                </Box>
                <Box
                  style={tailwind('mt-6 w-11/12 items-center flex flex-row')}
                >
                  <View style={tailwind('w-8/12')}>
                    <FMTextInput
                      placeholderTextColor="white"
                      label="Phone Number"
                      name="phoneNumber"
                      formik={formik as unknown as FormikProps<FormikValues>}
                      icon="phone"
                    />
                  </View>
                  <Button
                    size="xs"
                    style={tailwind('w-4/12')}
                    isLoading={showLocalLoader}
                    onPress={() => {
                      sendVerification(formik.values.phoneNumber);
                    }}
                  >
                    Create OTP
                  </Button>
                </Box>
                <Box style={tailwind('mt-6 w-full items-center')}>
                  <FMTextInput
                    label="Verification Code"
                    formik={formik as unknown as FormikProps<FormikValues>}
                    placeholderTextColor="white"
                    name="verificationCode"
                    icon="lock"
                    doNotShow
                  />
                </Box>
                <FirebaseRecaptchaVerifierModal
                  ref={recaptchaVerifier}
                  firebaseConfig={firebase.app().options}
                />
                <Box style={tailwind('mt-8 w-3/6')}>
                  <Button
                    isLoading={pendingRegistration}
                    endIcon={
                      <Icon
                        as={<MaterialIcons name="arrow-forward" size={4} />}
                      />
                    }
                    onPress={formik.handleSubmit}
                    block
                    light
                  >
                    Sign Up
                  </Button>
                </Box>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUpPhone;
