import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Icon, Spinner } from 'native-base';
import { Formik, FormikProps, FormikValues } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentResult } from 'expo-document-picker';
import {
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

const UserProfile: FC = () => {
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
  const userDetails = useSelector(selectUserDetails);
  const storeStatus = useSelector(selectStoreStatus);
  const [file, setFile] = useState<DocumentResult | undefined>(undefined);
  const [userInitials, setUserInitials] = useState<string>('KZ');
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

  if (storeStatus === APIStatuses.LOADING || uploadImage === 'pending')
    return <Spinner accessibilityLabel="loading profile" />;
  return (
    <View>
      <Text>
        {userDetails.userName} {userDetails.email}
        {userDetails.profileImageUrl}
      </Text>
      <Avatar
        bg="emerald.400"
        size="xl"
        source={{
          uri: userDetails.profileImageUrl
            ? userDetails.profileImageUrl
            : 'brokenLink',
        }}
      >
        {userInitials}
      </Avatar>
      <Text onPress={openFilePicker}>Change image url</Text>
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
            <Box>
              <FMTextInput
                disableInput={inputsDisabled}
                label="Name"
                name="name"
                formik={formik as unknown as FormikProps<FormikValues>}
              />
              <FMTextInput
                disableInput={inputsDisabled}
                label="Location"
                name="location"
                formik={formik as unknown as FormikProps<FormikValues>}
              />
              <FMTextInput
                disableInput={inputsDisabled}
                label="Phone Number"
                name="phoneNumber"
                formik={formik as unknown as FormikProps<FormikValues>}
              />
            </Box>
            {inputsDisabled ? (
              <Button
                endIcon={
                  <Icon as={<MaterialIcons name="arrow-forward" size="4" />} />
                }
                onPress={() => setInputsDisabled(false)}
                light
              >
                Edit
              </Button>
            ) : (
              <>
                <Button onPress={formik.handleSubmit}>Save</Button>
                <Button
                  onPress={() => {
                    formik.resetForm();
                    setInputsDisabled(true);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default UserProfile;
