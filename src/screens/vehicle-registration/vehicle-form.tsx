import { Formik, FormikProps, FormikValues } from 'formik';
import React, { FC, useState } from 'react';
import { Box, Button, ScrollView, Text } from 'native-base';
import tailwind from 'tailwind-rn';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  VEHICLE_REGISTER_INITIALIZER,
  VEHICLE_REGISTRATION_VALIDATION,
  VEHICLE_TYPE_OPTIONS,
} from './models/constants';
import { DriverInfo, VehicleInfo } from './models/models';
import FMTextInput from '../../shared/components/TextInput';
import FMSelectInput from '../../shared/components/SelectInput/FMSelectInput';
import FMImageUploadDisplay from '../../shared/components/ImageUploadDisplay/ImageUploadDisplay';

const VehicleForm: FC<{
  openCamera: () => void;
  carImageInfo?: string;
  driverImageInfo?: string;
  openDriverCamera: () => void;
  setRegistrationDetails: (details: {
    registrationDetails: VehicleInfo & DriverInfo;
  }) => void;
  initialFormValues: (DriverInfo & VehicleInfo) | undefined;
}> = ({
  setRegistrationDetails,
  initialFormValues,
  openCamera,
  openDriverCamera,
  driverImageInfo,
  carImageInfo,
}) => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const validationSchema = VEHICLE_REGISTRATION_VALIDATION;
  return (
    <Formik
      initialValues={
        (initialFormValues ?? VEHICLE_REGISTER_INITIALIZER) as VehicleInfo &
          DriverInfo
      }
      validationSchema={validationSchema}
      onSubmit={(registrationDetails) => {
        setRegistrationDetails({ registrationDetails });
      }}
    >
      {(formik: FormikProps<VehicleInfo & DriverInfo>) => (
        <View style={tailwind('h-full flex-1 items-center flex-col')}>
          <Box
            rounded="lg"
            style={tailwind('w-11/12 items-center my-5')}
            shadow={3}
            _light={{ backgroundColor: 'gray.50' }}
            _dark={{ backgroundColor: 'gray.50' }}
          >
            <View style={tailwind('w-11/12 flex-row my-5')}>
              <View style={tailwind('w-1/2 m-0')}>
                <Box style={tailwind('ml-1 mr-4')}>
                  <FMSelectInput
                    icon="ios-car-sharp"
                    iconPlacement={<Ionicons name="ios-car-sharp" />}
                    inputColor="grey"
                    formik={formik as unknown as FormikProps<FormikValues>}
                    name="vehicleType"
                    options={VEHICLE_TYPE_OPTIONS}
                    placeholder="Vehicle"
                  />
                </Box>
                <Box style={tailwind('my-1 ml-1')}>
                  <FMTextInput
                    icon="category"
                    label="Model"
                    inputColor="grey"
                    formik={formik as unknown as FormikProps<FormikValues>}
                    name="carModel"
                  />
                </Box>
                <Box style={tailwind('my-1 ml-1')}>
                  <FMTextInput
                    label="Color"
                    formik={formik as unknown as FormikProps<FormikValues>}
                    name="color"
                    icon="color"
                    iconPlacement={<Ionicons name="color-palette-outline" />}
                    inputColor="grey"
                  />
                </Box>
              </View>

              <View style={tailwind('-ml-20 w-5/12')}>
                {carImageInfo ? (
                  <View style={tailwind('ml-24 w-full h-36')}>
                    <Image
                      style={tailwind('h-full')}
                      source={{ uri: carImageInfo }}
                    />
                  </View>
                ) : (
                  <FMImageUploadDisplay
                    callback={openCamera}
                    label="Photo of car"
                    styleProp="w-full mx-24 py-12 mb-4"
                    iconPlacement={<FontAwesome5 name="car-alt" size={24} />}
                  />
                )}
                {!!carImageInfo && (
                  <View style={tailwind('ml-24 my-4 w-full -mb-4')}>
                    <TouchableOpacity onPress={openCamera}>
                      <Text style={tailwind('text-center text-blue-300')}>
                        Retake Picture!
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View style={tailwind('w-full items-center mb-4')}>
              <FMTextInput
                label="BP-A-1234"
                formik={formik as unknown as FormikProps<FormikValues>}
                name="numberPlate"
                styleProp="my-1"
              />
              <FMTextInput
                label="Blue Book number"
                formik={formik as unknown as FormikProps<FormikValues>}
                name="blueBookNumber"
                styleProp="my-1"
              />
              <FMTextInput
                label="License Number"
                formik={formik as unknown as FormikProps<FormikValues>}
                name="licenseNumber"
                styleProp="my-1"
              />
            </View>
          </Box>
          <Box
            rounded="lg"
            style={tailwind('w-11/12 items-center my-2')}
            shadow={3}
            _light={{ backgroundColor: 'gray.50' }}
            _dark={{ backgroundColor: 'gray.50' }}
          >
            <View style={tailwind('w-11/12 flex-row my-5')}>
              <View style={tailwind('w-1/2 m-0')}>
                <FMTextInput
                  label="Driver Name"
                  formik={formik as unknown as FormikProps<FormikValues>}
                  name="driverName"
                  styleProp="my-1"
                />
                <FMTextInput
                  label="Age"
                  formik={formik as unknown as FormikProps<FormikValues>}
                  name="age"
                  styleProp="my-1"
                />
                <FMTextInput
                  label="Contact Number"
                  formik={formik as unknown as FormikProps<FormikValues>}
                  name="contactNumber"
                  styleProp="my-1"
                />
              </View>
              <View style={tailwind('-ml-20 w-5/12')}>
                {!!driverImageInfo ? (
                  <View style={tailwind('ml-24 w-full h-36')}>
                    <Image
                      style={tailwind('h-full')}
                      source={{ uri: driverImageInfo }}
                    />
                  </View>
                ) : (
                  <FMImageUploadDisplay
                    callback={openDriverCamera}
                    label="Photo of Driver"
                    styleProp="w-full mx-24 py-12 mb-4"
                    iconPlacement={
                      <Ionicons name="person" size={24} color="black" />
                    }
                  />
                )}
                {!!driverImageInfo && (
                  <View style={tailwind('ml-24 my-4 w-full -mb-4')}>
                    <TouchableOpacity onPress={openDriverCamera}>
                      <Text style={tailwind('text-center text-blue-300')}>
                        Retake Picture!
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Box>
          <Button
            style={tailwind('w-11/12 my-4 bg-green-300')}
            onPress={() => formik.handleSubmit()}
          >
            {initialFormValues?.carModel ? 'Update' : 'Register'}
          </Button>
        </View>
      )}
    </Formik>
  );
};
export default VehicleForm;
