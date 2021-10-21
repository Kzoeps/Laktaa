import firebase from 'firebase';
import { APIStatuses } from '../../../shared/models/model';

export interface AuthState {
  userDetails: UserDetails;
  status: APIStatuses;
  error: string | null;
}

export interface LoginFormValues {
  phoneNumber: string;
  verificationCode: string;
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
  phoneNumber: string;
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
  phoneNumber: string;
  verificationCode: string;
  name: string;
  location: string;
}
