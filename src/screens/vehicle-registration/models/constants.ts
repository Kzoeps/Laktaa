import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '../../../shared/models/constants';

export const VEHICLE_REGISTER_INITIALIZER = {
  vehicleType: '',
  carModel: '',
  color: '',
  numberPlate: '',
  bluebookNumber: '',
  licenseNumber: '',
};

export const VEHICLE_REGISTRATION_VALIDATION = Yup.object().shape({
  vehicleType: Yup.string().required(VALIDATION_MESSAGES.required),
  carModel: Yup.string().required(VALIDATION_MESSAGES.required),
  color: Yup.string(),
  numberPlate: Yup.string().required(VALIDATION_MESSAGES.required),
  bluebookNumber: Yup.string().required(VALIDATION_MESSAGES.required),
  licenseNumber: Yup.string().required(VALIDATION_MESSAGES.required),
});

export const DRIVER_DETAILS_INITIALIZER = {
  driverName: '',
  age: '',
  contactNumber: '',
};

export const VEHICLE_TYPE_OPTIONS = [
  { label: 'Taxi', value: 'taxi' },
  { label: 'Private', value: 'private' },
  { label: 'Truck', value: 'truck' },
];
