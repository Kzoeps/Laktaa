import React, { FC, useContext, useEffect, useState } from 'react';
import { Box, Button, Spinner, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import FMHeader from '../../shared/components/FMHeader/FMHeader';
import Layout from '../../shared/layout/layout';
import VehicleForm from './vehicle-form';
import { DriverInfo, VehicleInfo } from './models/models';
import { AuthContext } from '../auth/auth';
import { getToastConfig, selectStoreStatus } from '../../shared/utils';
import { APIStatuses, RootReducersEnum, ToastTypes } from '../../shared/models/model';
import { setVehicleRegistration } from './store/driverSlice';
import { RootState } from '../../store/store';

const VehicleRegistration: FC = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState<DriverInfo & VehicleInfo>();
  const [updateDriverInfo, setUpdateDriverInfo] = useState<boolean>(false);
  const vehicleInfo = useSelector((state: RootState) => state.vehicle.details);
  const status = useSelector(selectStoreStatus(RootReducersEnum.vehicleSlice))
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (updateDriverInfo) {
      const { email } = currentUser;
			const setDriverInfo = async (details: {vehicleInfo: VehicleInfo & DriverInfo, email: string} ) => {
				await dispatch(setVehicleRegistration(details))
				toast.show(
					getToastConfig('Registered successfully', ToastTypes.success)
				);
				setUpdateDriverInfo(false);
			}
			// eslint-disable-next-line no-void
      void setDriverInfo({vehicleInfo: formValues as DriverInfo & VehicleInfo, email});
    }
  }, [dispatch, updateDriverInfo, formValues, currentUser, toast]);

  if (status === APIStatuses.LOADING) return <Spinner accessibilityLabel="loading vehicle info"/>
  return (
    <>
      <Box bg="emerald.400">
        <FMHeader header="Vehicle Registration" />
        <Layout styleProp="h-full">
          <VehicleForm
						initialFormValues={vehicleInfo}
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
