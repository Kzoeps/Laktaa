import React, { FC, useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Heading, Spinner } from 'native-base';
import { Formik, FormikProps, FormikValues } from 'formik';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentResult } from 'expo-document-picker';
import tailwind from 'tailwind-rn';
import firebase from 'firebase';
import {
  fetchUserProfile,
  selectStoreStatus,
  selectUserDetails,
  updateUserProfile as updateUserProfileStore,
  updateUserProfileImage,
  setUserDetails,
} from '../auth/store/authSlice';
import { EDIT_PROFILE_SCHEMA } from './models/constants';
import FMTextInput from '../../shared/components/TextInput';
import {
  APIStatuses,
  NavigationProps,
  RoutePaths,
} from '../../shared/models/model';
import { UserDetails } from '../auth/models/models';
import useFirestoreUpload from '../../shared/components/useFirestoreUpload';
import Layout from '../../shared/layout/layout';
import FMAvatar from '../../shared/components/FMAvatar/FMAvatar';
import FMHeader from '../../shared/components/FMHeader/FMHeader';
import { AuthContext } from '../auth/auth';

type UserProfileNavProps = NavigationProps<RoutePaths.userProfile>;
const UserProfile: FC<UserProfileNavProps> = ({ route, navigation }) => {
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
  const [uploadImageStatus, setUploadImageStatus] = useState<boolean>(false);
  const userDetails = useSelector(selectUserDetails);
  const storeStatus = useSelector(selectStoreStatus);
  const { phoneNumber } = route.params;
  const [file, setFile] = useState<DocumentResult | undefined>(undefined);
  const [userInitials, setUserInitials] = useState<string>('');
  const { currentUser, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const uploadImage = useFirestoreUpload(
    `profileImages/${phoneNumber}`,
    file,
    setFile,
		setUploadImageStatus
  );

  const initialValues = {
    name: userDetails?.userName ?? '',
    location: userDetails?.location ?? '',
    phoneNumber: userDetails?.phoneNumber ?? '',
  };
  const validationSchema = EDIT_PROFILE_SCHEMA;

  const updateUserProfile = async (userDetailsPayload: UserDetails) => {
    try {
      await firebase
        .auth()
        .currentUser?.updateProfile({ displayName: userDetails.userName });
      await dispatch(updateUserProfileStore(userDetailsPayload));
    } catch (e) {
      console.log(e);
    }
  };

  const createUserProfile = async (userDetailsPayload: UserDetails) => {
    try {
      await firebase.auth();
      // .currentUser?.updateProfile({ displayName: userDetails.userName });
      await dispatch(
        setUserDetails({ ...userDetailsPayload, registeredDriver: false })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const openFilePicker = async () => {
    const fileRef = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
    if (fileRef.type === 'success') {
    	const profileImageUrl = await uploadImage.uploadFile(fileRef.uri);
    	await dispatch(updateUserProfileImage({
				phoneNumber: currentUser.phoneNumber,
				profileImageUrl
			}))
    }
  };

  useEffect(() => {
    if (currentUser.displayName) dispatch(fetchUserProfile(phoneNumber));
  }, [phoneNumber, dispatch, currentUser.displayName]);

  useEffect(() => {
    if (phoneNumber === currentUser.phoneNumber) setInputsDisabled(false);
    else setInputsDisabled(true);
  }, [phoneNumber, currentUser.phoneNumber]);

  /* useEffect(() => {
    if (!['idle', 'pending'].includes(uploadImage)) {
      const updateUserProfileImageUrl = async () => {
        await dispatch(
          updateUserProfileImage({
            phoneNumber: currentUser.phoneNumber,
            profileImageUrl: uploadImage,
          })
        );
      };
      updateUserProfileImageUrl();
    }
  }, [uploadImage, dispatch, currentUser.phoneNumber]); */
  useEffect(() => {
    setUserInitials(
      userDetails?.userName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
    );
  }, [userDetails?.userName]);

  if (storeStatus === APIStatuses.LOADING || uploadImageStatus) {
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
    <Box bg="emerald.400">
      <ScrollView>
        <FMHeader header="My Profile" />
        <Layout styleProp="h-full">
          <View style={tailwind('items-center h-full w-full my-14')}>
            <View style={tailwind('mt-10 mb-4')}>
              <FMAvatar
                fallbackText={userInitials}
                showBadge
                onBadgeClick={openFilePicker}
                imageUrl={userDetails?.profileImageUrl}
              />
            </View>
            <View style={tailwind('items-center w-full h-1/2')}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async ({
                  name: userName,
                  phoneNumber: userNumber,
                  location,
                }) => {
                  if (firebase.auth()?.currentUser?.displayName != null) {
                    await updateUserProfile({
                      userName,
                      phoneNumber: currentUser.phoneNumber,
                      location,
                    });
                    return;
                  }
                  await createUserProfile({
                    userName,
                    phoneNumber: currentUser.phoneNumber,
                    location,
                  });
                }}
              >
                {(
                  formik: FormikProps<{
                    name: string;
                    phoneNumber: number;
                    location: string;
                  }>
                ) => (
                  <>
                    <Box style={tailwind('w-10/12 items-center')}>
                      <FMTextInput
                        styleProp="mt-3"
                        disableInput={inputsDisabled}
                        label="Name"
                        name="name"
                        formik={formik as unknown as FormikProps<FormikValues>}
                      />
                      <FMTextInput
                        styleProp="mt-3"
                        disableInput={inputsDisabled}
                        label="Location"
                        name="location"
                        formik={formik as unknown as FormikProps<FormikValues>}
                      />
                      {/* <FMTextInput */}
                      {/*  styleProp="mt-3" */}
                      {/*  disableInput={inputsDisabled} */}
                      {/*  label="Phone Number" */}
                      {/*  name="phoneNumber" */}
                      {/*  formik={formik as unknown as FormikProps<FormikValues>} */}
                      {/* /> */}
                    </Box>

                    <View style={tailwind('mt-8 items-center')}>
                      {!inputsDisabled && (
                        <View style={tailwind('w-10/12 flex flex-row')}>
                          <Button
                            style={tailwind('flex-auto mr-3')}
                            onPress={formik.handleSubmit}
                          >
                            Save
                          </Button>
                          <Button
                            style={tailwind('flex-auto ml-1')}
                            onPress={() => {
                              formik.resetForm();
                            }}
                          >
                            Cancel
                          </Button>
                        </View>
                      )}
                    </View>
                  </>
                )}
              </Formik>
            </View>
            <TouchableOpacity style={tailwind('')} onPress={logout}>
              <Text
                style={tailwind('w-full font-bold underline items-center h-10')}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Layout>
      </ScrollView>
    </Box>
  );
};

export default UserProfile;
