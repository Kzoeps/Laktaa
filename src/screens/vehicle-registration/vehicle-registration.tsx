import React, { FC, useContext, useEffect, useState } from 'react';
import { Box, Button, useToast } from 'native-base';
import FMHeader from '../../shared/components/FMHeader/FMHeader';
import Layout from '../../shared/layout/layout';
import VehicleForm from './vehicle-form';
import { DriverInfo, VehicleInfo } from './models/models';
import { AuthContext } from '../auth/auth';
import { VEHICLE_REGISTER_CALLS } from './utils/API';
import { getToastConfig } from '../../shared/utils';
import { ToastTypes } from '../../shared/models/model';

const VehicleRegistration: FC = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState<DriverInfo & VehicleInfo>();
  const [updateDriverInfo, setUpdateDriverInfo] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    if (updateDriverInfo) {
      const { email } = currentUser;
      VEHICLE_REGISTER_CALLS.registerVehicle(
        formValues as DriverInfo & VehicleInfo,
        email
      ).then(() => {
        toast.show(
          getToastConfig('Registered successfully', ToastTypes.success)
        );
      });
      setUpdateDriverInfo(false);
    }
  }, [updateDriverInfo, formValues, currentUser, toast]);

  return (
    <>
      <Box bg="emerald.400">
        <FMHeader header="Vehicle Registration" />
        <Layout styleProp="h-full">
          <VehicleForm
            setFormValues={setFormValues}
            setUpdateDriverInfo={setUpdateDriverInfo}
          />
          <Button onPress={() => navigation.navigate('User Profile')}>
            ROUTE TO USER
          </Button>
        </Layout>
      </Box>
    </>
  );
};
export default VehicleRegistration;
