import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Icon, Spinner } from 'native-base';
import { Formik, FormikProps, FormikValues } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentResult } from 'expo-document-picker';
import tailwind from 'tailwind-rn';
import { NavigationScreenProp } from 'react-navigation';
import {
  fetchUserProfile,
  selectStoreStatus,
  selectUserDetails,
  updateUserProfile as updateUserProfileStore,
  updateUserProfileImage,
} from '../auth/store/authSlice';
import { EDIT_PROFILE_SCHEMA } from './models/constants';
import FMTextInput from '../../shared/components/TextInput';
import { APIStatuses } from '../../shared/models/model';
import { UserDetails } from '../auth/models/models';
import useFirestoreUpload from '../../shared/components/useFirestoreUpload';
import Layout from '../../shared/layout/layout';
import FMAvatar from '../../shared/components/FMAvatar/FMAvatar';
import FMHeader from '../../shared/components/FMHeader/FMHeader';
import { AuthContext } from '../auth/auth';

const UserProfile: FC<{ navigation: NavigationScreenProp<any> }> = ({
  navigation,
}) => {
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
  const userDetails = useSelector(selectUserDetails);
  const storeStatus = useSelector(selectStoreStatus);
  const [file, setFile] = useState<DocumentResult | undefined>(undefined);
  const [userInitials, setUserInitials] = useState<string>('');
  const { currentUser, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const uploadImage = useFirestoreUpload(
    `profileImages/${userDetails?.email}`,
    file,
    setFile
  );

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
  const openFilePicker = async () => {
    const fileRef = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
    if (fileRef.type === 'success') setFile(fileRef);
  };

  useEffect(() => {
    if (!userDetails.userName) {
      currentUser.email && dispatch(fetchUserProfile(currentUser.email));
    }
  });

  useEffect(() => {
    if (!['idle', 'pending'].includes(uploadImage)) {
      const updateUserProfileImageUrl = async () => {
        await dispatch(
          updateUserProfileImage({
            email: userDetails.email,
            profileImageUrl: uploadImage,
          })
        );
      };
      updateUserProfileImageUrl();
    }
  }, [uploadImage, userDetails.email, dispatch]);
  useEffect(() => {
    setUserInitials(
      userDetails.userName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
    );
  }, [userDetails.userName]);

  if (storeStatus === APIStatuses.LOADING || uploadImage === 'pending')
    return <Spinner accessibilityLabel="loading profile" />;
  return (
    <Box bg="emerald.400">
      <FMHeader header="My Profile" />
      <Layout styleProp="h-full">
        <View style={tailwind('items-center h-full w-full')}>
          <View style={tailwind('mt-10 mb-4')}>
            <FMAvatar
              fallbackText={userInitials}
              showBadge={true}
              onBadgeClick={openFilePicker}
              imageUrl={userDetails.profileImageUrl}
            />
          </View>
          <View style={tailwind('items-center w-full h-full')}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={({ name: userName, phoneNumber, location }) => {
                updateUserProfile({
                  userName,
                  phoneNumber,
                  location,
                  email: userDetails.email,
                });
              }}
              onReset={() => {
                setInputsDisabled(true);
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
                    <FMTextInput
                      styleProp="mt-3"
                      disableInput={inputsDisabled}
                      label="Phone Number"
                      name="phoneNumber"
                      formik={formik as unknown as FormikProps<FormikValues>}
                    />
                  </Box>

                  <View style={tailwind('mt-8 items-center')}>
                    {inputsDisabled ? (
                      <>
                        <Button
                          endIcon={
                            <Icon
                              as={
                                <MaterialIcons name="arrow-forward" size="4" />
                              }
                            />
                          }
                          onPress={() => setInputsDisabled(false)}
                          light
                        >
                          Edit
                        </Button>
                      </>
                    ) : (
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
                            setInputsDisabled(true);
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
            <View>
              <Button
                style={tailwind('w-full items-center h-10')}
                onPress={logout}
              >
                Logout
              </Button>
            </View>
          </View>
        </View>
      </Layout>
    </Box>
  );
};

export default UserProfile;
