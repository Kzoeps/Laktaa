import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum APIStatuses {
  'IDLE' = 'IDLE',
  'LOADING' = 'LOADING',
  'SUCCEEDED' = 'SUCCEEDED',
  'FAILED' = 'FAILED',
}

export interface BasicOption {
  label: string;
  value: string;
}

export enum ToastTypes {
  success = 'success',
  warn = 'warning',
  info = 'info',
  error = 'error',
}

export enum RootReducersEnum {
  authSlice = 'auth',
  vehicleSlice = 'vehicle',
}

export enum RoutePaths {
	dashboard = 'Dashboard',
	userProfile = 'UserProfile',
	vehicleRegistration = 'VehicleRegistration',
	postJob = 'PostJob',
	jobDetails = 'JobDetails'
}

export  type AppStackParamList = {
	[RoutePaths.dashboard]: undefined;
	[RoutePaths.userProfile]: { userEmail: string };
	[RoutePaths.vehicleRegistration]: undefined;
	[RoutePaths.postJob]: undefined;
	[RoutePaths.jobDetails]: undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type NavigationProps<T> = NativeStackScreenProps<AppStackParamList, T>
