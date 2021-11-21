import React, { useContext, useEffect, useRef, useState } from 'react';
import { Formik, FormikProps, FormikValues } from 'formik';
import { ImageBackground, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Icon, useToast } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { ApplicationVerifier } from '@firebase/auth-types';
import tailwind from 'tailwind-rn';
import firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { AuthContext } from './auth';
import FMTextInput from '../../shared/components/TextInput';
import { fetchUserProfile } from './store/authSlice';
import { LoginFormValues } from './models/models';
import { LOGIN_PHONE_SCHEMA } from './models/constants';
import { getToastConfig } from '../../shared/utils';
import { ToastTypes } from '../../shared/models/model';

const LoginScreen = ({ navigation }): JSX.Element => {
  const { loginWithEmail } = useContext(AuthContext);
  const [updateUserProfile, setUpdateUserProfile] = useState<boolean>(false);
  const [userEmail, setEmail] = useState<string>('');
  const [pending, setPending] = useState<boolean>(false);
  const [showLocalLoader, setShowLocalLoader] = useState<boolean>(false);
  const [verificationId, setVerificationId] = useState<string>('');
  const recaptchaVerifier = useRef(null);
  const initialValues = {
    phoneNumber: '',
    verificationCode: '',
  };
  const validationSchema = LOGIN_PHONE_SCHEMA;
  const dispatch = useDispatch();
  const toast = useToast();

  const sendVerification = (phoneNumber: string) => {
    if (!phoneNumber) {
      toast.show(getToastConfig('Phone number is required', ToastTypes.error));
      return;
    }
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    setShowLocalLoader(true);
    phoneProvider
      .verifyPhoneNumber(
        `+975${phoneNumber}`,
        recaptchaVerifier.current as unknown as ApplicationVerifier
      )
      .then((id) => {
        toast.show(getToastConfig('OTP has been sent', ToastTypes.success));
        setVerificationId(id);
      })
      .catch((error) => {
        toast.show(getToastConfig(error?.message || error, ToastTypes.error));
      })
      .finally(() => {
        setShowLocalLoader(false);
      });
  };

  const confirmCode = async (code: string) => {
		try {
			const credential = firebase.auth.PhoneAuthProvider.credential(
				verificationId,
				code,
			);
			await firebase.auth().signInWithCredential(credential);
		} catch (e) {
			toast.show(getToastConfig(e.message || e, ToastTypes.error));
		}
	};

  useEffect(() => () => {
    setPending(false);
  });
  return (
    <View style={{ flex: 1 }}>
      {/* eslint-disable-next-line global-require */}
      <ImageBackground
        source={require('../../assets/thimphu-bg.jpeg')}
        blurRadius={2}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={tailwind('items-center h-full')}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async ({ phoneNumber, verificationCode }) => {
							try {
								setPending(true);
								await confirmCode(verificationCode);
								if (firebase.auth().currentUser?.displayName)
									await dispatch(fetchUserProfile(phoneNumber));
							} catch (e) {
								toast.show(getToastConfig(e.message || e, ToastTypes.error));
							} finally {
								setPending(false);
							}
						}
					}
          >
            {(formik: FormikProps<LoginFormValues>) => (
              <View style={tailwind('h-full w-11/12 mt-32 items-center')}>
                <View style={tailwind('w-11/12 items-center flex flex-row')}>
                  <View style={tailwind('w-8/12')}>
                    <FMTextInput
                      label="Phone Number"
                      name="phoneNumber"
                      formik={formik as unknown as FormikProps<FormikValues>}
                      icon="phone"
                      color="white"
                    />
                  </View>
                  <Button
                    size="xs"
                    style={tailwind('w-4/12')}
                    isLoading={showLocalLoader}
                    onPress={() => sendVerification(formik.values.phoneNumber)}
                  >
                    Create OTP
                  </Button>
                </View>
                <FMTextInput
                  styleProp="mt-10"
                  label="Verification Code"
                  name="verificationCode"
                  formik={formik as unknown as FormikProps<FormikValues>}
                  icon="lock"
                  doNotShow
                  color="white"
                />
                <Button
                  style={tailwind('mt-10 w-11/12 rounded-lg')}
                  isLoading={pending}
                  endIcon={
                    <Icon
                      as={<MaterialIcons name="arrow-forward" size={4} />}
                    />
                  }
                  onPress={formik.handleSubmit}
                  block
                  light
                >
                  Log In
                </Button>
                <FirebaseRecaptchaVerifierModal
                  ref={recaptchaVerifier}
                  firebaseConfig={firebase.app().options}
                />
                <View
                  style={tailwind('flex flex-row h-full w-11/12 items-center ')}
                >
                  <Text
                    style={tailwind(
                      'h-44 flex-auto w-3/6 mb-8 text-white text-right'
                    )}
                  >
                    Dont have an account?
                  </Text>
                  <Text
                    style={tailwind(
                      'h-44 flex-auto w-8 text-green-400 text-left ml-2 mb-8 mr-8 font-bold'
                    )}
                    onPress={() => navigation.navigate('Sign Up')}
                  >
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
