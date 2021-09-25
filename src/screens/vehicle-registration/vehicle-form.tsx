import { Formik, FormikProps, FormikValues } from 'formik';
import React, { FC, useState } from 'react';
import { Button } from 'native-base';
import tailwind from 'tailwind-rn';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  VEHICLE_REGISTER_INITIALIZER,
  VEHICLE_REGISTRATION_VALIDATION,
  VEHICLE_TYPE_OPTIONS,
} from './models/constants';
import { DriverInfo, VehicleInfo } from './models/models';
import FMTextInput from '../../shared/components/TextInput';
import FMSelectInput from '../../shared/components/SelectInput/FMSelectInput';
import FMImageUploadDisplay from '../../shared/components/ImageUploadDisplay/ImageUploadDisplay';
import OpenCamera from '../postjob/Camera';

const VehicleForm: FC<{
  setRegistrationDetails: (details: { registrationDetails: VehicleInfo & DriverInfo}) => void,
  initialFormValues: DriverInfo & VehicleInfo | undefined
}> = ({ setRegistrationDetails, initialFormValues }) => {
	const [showCamera, setShowCamera,] = useState<boolean>(false);
	const [imageInfo, setImageInfo] = useState<string>('');
  const validationSchema = VEHICLE_REGISTRATION_VALIDATION;

	const openCamera = () => {
  	setShowCamera(true);
	}

  return (
    <>
			{showCamera && <OpenCamera showMySelf={showCamera} updateImageInfo={setImageInfo}/>}
			<FMImageUploadDisplay callback={openCamera} label="Photo of car" iconPlacement={<FontAwesome5 name="car-alt" size={24} color="black" />}/>
      <Formik
        initialValues={initialFormValues ?? VEHICLE_REGISTER_INITIALIZER}
        // validationSchema={validationSchema}
        onSubmit={(registrationDetails) => {
        	setRegistrationDetails({registrationDetails})
        }}
      >
        {(formik: FormikProps<VehicleInfo & DriverInfo>) => (
          <>
            <FMSelectInput
              icon="car-cog"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="vehicleType"
              options={[...VEHICLE_TYPE_OPTIONS]}
              placeholder="Vehicle Type"
            />
            <FMTextInput
              label="Model"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="carModel"
            />
            <FMTextInput
              label="Color"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="color"
            />
            <FMTextInput
              label="BP-A-1234"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="numberPlate"
            />
            <FMTextInput
              label="Blue Book number"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="blueBookNumber"
            />
            <FMTextInput
              label="License Number"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="licenseNumber"
            />
            <FMTextInput
              label="Driver Name"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="driverName"
            />
            <FMTextInput
              label="Age"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="age"
            />
            <FMTextInput
              label="Contact Number"
              formik={formik as unknown as FormikProps<FormikValues>}
              name="contactNumber"
            />
            <Button
              style={tailwind('flex-auto ml-1')}
              onPress={formik.handleSubmit}
            >
              Register
            </Button>
          </>
        )}
      </Formik>
    </>
  );
};
export default VehicleForm;
