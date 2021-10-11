import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface PostJobInfo {
	called: string[];
	loadType: string;
	perish: string;
	price: number;
	weight: number;
	height: number;
	length: number;
	breath: number;
	pickPlace: string;
	pickDzongkhag: string;
	pickGewog: string;
	pickUpPhone: number;
	pickUpDate: { nanoseconds: number; seconds: number };
	dropDzongkhag: string;
	dropGewog: string;
	dropPlace: string;
	dropOffPhone: number;
	dropOffDate: { nanoseconds: number; seconds: number };
	remarks: string;
	poster?: string;
	imageUri?: string;
}

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
	[RoutePaths.jobDetails]: {imageUrl: string, data: PostJobInfo};
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type NavigationProps<T> = NativeStackScreenProps<AppStackParamList, T>
