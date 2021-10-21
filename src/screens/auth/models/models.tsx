import { APIStatuses } from 'src/shared/models/model';
import firebase from 'firebase';

export interface AuthState {
  userDetails: UserDetails;
  status: APIStatuses;
  error: string | null;
}

export interface LoginFormValues {
	phoneNumber: number
	verificationCode: number
}

export interface UserDetails {
  userName: string;
  userId?: string;
  location: string;
  email?: string;
  phoneNumber: number | string;
  profileImageUrl?: string;
  registeredDriver?: boolean;
}

export interface ProfileUpdatePayload {
  profileImageUrl: string;
  email: string;
}

export interface AuthContext {
  currentUser: firebase.User;
  // eslint-disable-next-line no-unused-vars
  setCurrentUser: (user: firebase.User) => void;
}

export enum AuthStoreActionTypes {
  setUserDetails = 'auth/setUserDetails',
  fetchUserProfile = 'auth/fetchUserProfile',
  updateUserProfile = 'auth/updateUserProfile',
  updateUserProfileImage = 'auth/updateUserProfileImage',
}

export interface SignUpForm {
	phoneNumber: string,
	verificationCode: string,
	name: string,
	location: string
}
