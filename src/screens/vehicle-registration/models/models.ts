import { APIStatuses } from '../../../shared/models/model';

export interface VehicleInfo {
  vehicleType: string;
  carModel: string;
  color?: string;
  numberPlate: string;
  blueBookNumber: string;
  licenseNumber: string;
  carImageUri?: string;
}

export interface DriverInfo {
  driverName: string;
  age: number;
  contactNumber: number;
  driverImageUri?: string;
}

export interface VehicleSlice {
  details: (VehicleInfo & DriverInfo) | undefined;
  status: APIStatuses;
  error: null | string;
}

export enum DriverSliceActionTypes {
  setVehicleRegistration = 'vehicle/setVehicleRegistration',
  updateVehicleRegistration = 'vehicle/updateVehicleRegistration',
  getVehicleRegistration = 'vehicle/vehicleRegistrationDetails',
}
