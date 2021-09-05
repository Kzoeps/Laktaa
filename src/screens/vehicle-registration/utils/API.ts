import firebase from 'firebase';
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
};
