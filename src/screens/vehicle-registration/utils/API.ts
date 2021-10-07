import firebase from 'firebase';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { DriverInfo, VehicleInfo } from '../models/models';
import { RegistrationCollections } from '../models/constants';

export const VEHICLE_REGISTER_CALLS = {
  registerVehicle: (
    info: VehicleInfo & DriverInfo,
    email: string
  ): Promise<void> =>
    firebase
      .firestore()
      .collection(RegistrationCollections.driverRegistrations)
      .doc(email)
      .set(info),
  updateVehicleRegistration: (
    info: VehicleInfo & DriverInfo,
    email: string
  ): Promise<void> =>
    firebase
      .firestore()
      .collection(RegistrationCollections.driverRegistrations)
      .doc(email)
      .update(info),
  getVehicleRegistration: (
    email: string
  ): Promise<DocumentSnapshot<VehicleInfo & DriverInfo>> =>
    firebase
      .firestore()
      .collection(RegistrationCollections.driverRegistrations)
      .doc(email)
      .get() as Promise<DocumentSnapshot<VehicleInfo & DriverInfo>>,
};
