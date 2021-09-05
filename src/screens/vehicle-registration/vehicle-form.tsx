import { Formik, FormikProps, FormikValues } from 'formik';
import React, { FC } from 'react';
import { Button } from 'native-base';
import tailwind from 'tailwind-rn';
import {
  VEHICLE_REGISTER_INITIALIZER,
  VEHICLE_REGISTRATION_VALIDATION,
  VEHICLE_TYPE_OPTIONS,
} from './models/constants';
import { DriverInfo, VehicleInfo } from './models/models';
import FMTextInput from '../../shared/components/TextInput';
import FMSelectInput from '../../shared/components/SelectInput/FMSelectInput';

const VehicleForm: FC<{
  setFormValues: (formVals: DriverInfo & VehicleInfo) => void;
  setUpdateDriverInfo: (update: boolean) => void;
}> = ({ setFormValues, setUpdateDriverInfo }) => {
  const initialValues = VEHICLE_REGISTER_INITIALIZER;
  const validationSchema = VEHICLE_REGISTRATION_VALIDATION;
  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          setFormValues(values);
          setUpdateDriverInfo(true);
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
