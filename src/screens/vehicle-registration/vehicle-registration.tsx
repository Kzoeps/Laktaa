import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Spinner, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import FMHeader from '../../shared/components/FMHeader/FMHeader';
import Layout from '../../shared/layout/layout';
import VehicleForm from './vehicle-form';
import { DriverInfo, VehicleInfo } from './models/models';
import { AuthContext } from '../auth/auth';
import { getToastConfig, selectStoreStatus } from '../../shared/utils';
import { APIStatuses, RootReducersEnum, ToastTypes } from '../../shared/models/model';
import { getVehicleRegistrationDetails, setVehicleRegistration } from './store/driverSlice';
import { RootState } from '../../store/store';

const VehicleRegistration: FC = ({ navigation }) => {
	const { currentUser } = useContext(AuthContext);
	const [formValues, setFormValues] = useState<DriverInfo & VehicleInfo>();
	// const [updateDriverInfo, setUpdateDriverInfo] = useState<boolean>(false);
	const updateDriverInfo = useRef<boolean>(false);
	const vehicleInfo = useSelector((state: RootState) => state.vehicle.details);
	const status = useSelector(selectStoreStatus(RootReducersEnum.vehicleSlice));
	const dispatch = useDispatch();
	const toast = useToast();

	const setUpdateDriverInfo = (val: boolean) => updateDriverInfo.current = val;

	useEffect(() => {
		if (currentUser.email && !vehicleInfo) {
			const getVehicleInfo = async (email: string) => {
				await dispatch(getVehicleRegistrationDetails(email));
			};
			getVehicleInfo(currentUser.email);
		}
	}, [dispatch, formValues, currentUser.email, vehicleInfo]);

	useEffect((): any => {
		if (!updateDriverInfo.current) return;
		const { email } = currentUser;
		const setDriverInfo = async (details: { vehicleInfo: VehicleInfo & DriverInfo, email: string }) => {
				await dispatch(setVehicleRegistration(details));
				toast.show(
					getToastConfig('Registered successfully', ToastTypes.success),
				);
				updateDriverInfo.current = false;
		};
		// eslint-disable-next-line no-void
		setDriverInfo({ vehicleInfo: formValues as DriverInfo & VehicleInfo, email });
		// eslint-disable-next-line no-void,no-return-assign,consistent-return
		return (): void => void (updateDriverInfo.current = false);

	}, [dispatch, formValues, currentUser, toast]);

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
