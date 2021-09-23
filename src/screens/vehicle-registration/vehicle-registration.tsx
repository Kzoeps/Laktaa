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
import { useDispatch, useSelector } from 'react-redux';
import { setVehicleRegistration } from './store/driverSlice';

const VehicleRegistration: FC = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState<DriverInfo & VehicleInfo>();
  const [updateDriverInfo, setUpdateDriverInfo] = useState<boolean>(false);
  const status = useSelector()
  const dispatch = useDispatch();
  const toast = useToast();

  const setDriverInfo = async (details: {vehicleInfo: VehicleInfo & DriverInfo, email: string} ) => {
  	await dispatch(setVehicleRegistration(details))
		toast.show(
			getToastConfig('Registered successfully', ToastTypes.success)
		);
		setUpdateDriverInfo(false);
	}
  useEffect(() => {
    if (updateDriverInfo) {
      const { email } = currentUser;
			// eslint-disable-next-line no-void
      void setDriverInfo({vehicleInfo: formValues as DriverInfo & VehicleInfo, email});
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
