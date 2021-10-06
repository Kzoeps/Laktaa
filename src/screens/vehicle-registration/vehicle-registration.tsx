import React, { FC, useContext, useEffect, useState } from 'react';
import { Box, Button, Spinner, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import FMHeader from '../../shared/components/FMHeader/FMHeader';
import Layout from '../../shared/layout/layout';
import VehicleForm from './vehicle-form';
import { DriverInfo, VehicleInfo } from './models/models';
import { AuthContext } from '../auth/auth';
import { getToastConfig, selectStoreStatus } from '../../shared/utils';
import { APIStatuses, RootReducersEnum, ToastTypes } from '../../shared/models/model';
import { getVehicleRegistrationDetails, setVehicleRegistration, updateVehicleRegistration } from './store/driverSlice';
import { RootState } from '../../store/store';
import OpenCamera from '../postjob/Camera';

const VehicleRegistration: FC = ({ navigation }) => {
	const [showCamera, setShowCamera] = useState<boolean>(false);
	const [showDriverCamera, setShowDriverCamera] = useState<boolean>(false);
	const [imageInfo, setImageInfo] = useState<string>('');
	const [driverImageInfo, setDriverImageInfo] = useState<string>('');
	const [showLoader, setShowLoader] = useState<boolean>(false);
	const { currentUser } = useContext(AuthContext);
	const vehicleInfo = useSelector((state: RootState) => state.vehicle.details);
	const status = useSelector(selectStoreStatus(RootReducersEnum.vehicleSlice));
	const dispatch = useDispatch();
	const toast = useToast();

	const closeCamera = (): void => {
		setShowCamera(false);
	};
	const openCamera = (): void => {
		setShowCamera(true);
	}
	const openDriverCamera = (): void => {
		setShowDriverCamera(true);
	}
	const closeDriverCamera = (): void => {
		setShowDriverCamera(false);
	}


	useEffect(() => {
		if (currentUser.email && !vehicleInfo) {
			const getVehicleInfo = async (email: string) => {
				await dispatch(getVehicleRegistrationDetails(email));
			};
			getVehicleInfo(currentUser.email);
		}
	}, [dispatch, currentUser.email, vehicleInfo]);

	const uploadFile = async (reference: string, fileUri: string): Promise<string> => {
		const storageRef = firebase.storage().ref().child(reference);
		const file = await fetch(fileUri);
		const blob = await file.blob();
		const firebaseUploadSnapshot = await storageRef.put(blob);
		const uploadedUri = firebaseUploadSnapshot.ref.getDownloadURL();
		return uploadedUri;
	}

	const setRegistrationDetails = async ({ registrationDetails }: { registrationDetails: VehicleInfo & DriverInfo }) => {
		const { email } = currentUser;
		setShowLoader(true)
		const payload = {...registrationDetails};
		if (imageInfo) {
			payload.carImageUri = await uploadFile(`carImages/${email}`, imageInfo)
		}
		if (driverImageInfo) {
			payload.driverImageUri = await uploadFile(`driverImages/${email}`, driverImageInfo);
		}
		if (vehicleInfo?.vehicleType) {
			await dispatch(updateVehicleRegistration({ registrationDetails: payload, email}));
		} else {
			await dispatch(setVehicleRegistration({ registrationDetails: payload, email }));
		}
		setShowLoader(false);
		toast.show(
			getToastConfig('Registered successfully', ToastTypes.success),
		);
	};

	if (status === APIStatuses.LOADING || showLoader) return <Spinner accessibilityLabel='loading vehicle info' />;
	return (
		<>
			<OpenCamera showMySelf={showCamera} closeCamera={closeCamera} updateImageInfo={setImageInfo} />
			<OpenCamera showMySelf={showDriverCamera} closeCamera={closeDriverCamera} updateImageInfo={setDriverImageInfo} />
			<Box bg='emerald.400'>
				<FMHeader header='Vehicle Registration' />
				<Layout styleProp='h-full'>
					<VehicleForm
						openDriverCamera={openDriverCamera}
						carImageInfo={imageInfo || vehicleInfo?.carImageUri}
						driverImageInfo={driverImageInfo || vehicleInfo?.driverImageUri}
						openCamera={openCamera}
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
