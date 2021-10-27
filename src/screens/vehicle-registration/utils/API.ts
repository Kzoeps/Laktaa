import firebase from 'firebase';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { DriverInfo, VehicleInfo } from '../models/models';
import { RegistrationCollections } from '../models/constants';

export const VEHICLE_REGISTER_CALLS = {
  registerVehicle: (
    info: VehicleInfo & DriverInfo,
    phoneNumber: string
  ): Promise<void> =>
    firebase
      .firestore()
      .collection(RegistrationCollections.driverRegistrations)
      .doc(phoneNumber)
      .set(info),
  updateVehicleRegistration: (
    info: VehicleInfo & DriverInfo,
    phoneNumber: string
  ): Promise<void> =>
    firebase
      .firestore()
      .collection(RegistrationCollections.driverRegistrations)
      .doc(phoneNumber)
      .update(info),
  getVehicleRegistration: (
    phoneNumber: string
  ): Promise<DocumentSnapshot<VehicleInfo & DriverInfo>> =>
    firebase
      .firestore()
      .collection(RegistrationCollections.driverRegistrations)
      .doc(phoneNumber)
      .get() as Promise<DocumentSnapshot<VehicleInfo & DriverInfo>>,
};
