import { Formik, FormikProps, FormikValues } from 'formik';
import React, { FC } from 'react';
import {
  VEHICLE_REGISTER_INITIALIZER,
  VEHICLE_REGISTRATION_VALIDATION,
  VEHICLE_TYPE_OPTIONS,
} from './models/constants';
import { VehicleInfo } from './models/models';
import FMTextInput from '../../shared/components/TextInput';
import FMSelectInput from '../../shared/components/SelectInput/FMSelectInput';

const VehicleForm: FC = () => {
  const initialValues = VEHICLE_REGISTER_INITIALIZER;
  const validationSchema = VEHICLE_REGISTRATION_VALIDATION;
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik: FormikProps<VehicleInfo>) => (
          <>
            <FMSelectInput
							icon='car-cog'
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
          </>
        )}
      </Formik>
    </>
  );
};
export default VehicleForm;
