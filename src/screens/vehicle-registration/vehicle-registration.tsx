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
	const vehicleInfo = useSelector((state: RootState) => state.vehicle.details);
	const status = useSelector(selectStoreStatus(RootReducersEnum.vehicleSlice));
	const dispatch = useDispatch();
	const toast = useToast();

	useEffect(() => {
		if (currentUser.email && !vehicleInfo) {
			const getVehicleInfo = async (email: string) => {
				await dispatch(getVehicleRegistrationDetails(email));
			};
			getVehicleInfo(currentUser.email);
		}
	}, [dispatch, currentUser.email, vehicleInfo]);

	const setRegistrationDetails = async ({ registrationDetails }: { registrationDetails: VehicleInfo & DriverInfo }) => {
		const { email } = currentUser;
		await dispatch(setVehicleRegistration({ registrationDetails, email }));
		toast.show(
			getToastConfig('Registered successfully', ToastTypes.success),
		);
	};

	if (status === APIStatuses.LOADING) return <Spinner accessibilityLabel='loading vehicle info' />;
	return (
		<>
			<Box bg='emerald.400'>
				<FMHeader header='Vehicle Registration' />
				<Layout styleProp='h-full'>
					<VehicleForm
						initialFormValues={vehicleInfo}
						setRegistrationDetails={setRegistrationDetails}
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
