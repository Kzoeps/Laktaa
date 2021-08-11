import { APIStatuses } from 'src/shared/models/model';
import firebase from 'firebase';

export interface AuthState {
  userDetails: UserDetails;
  status: APIStatuses;
  error: string | null;
}

export interface UserDetails {
  userName: string;
  userId?: string;
  location: string;
  email: string;
  phoneNumber?: number| string;
}

export interface AuthContext {
  currentUser: firebase.User;
  // eslint-disable-next-line no-unused-vars
  setCurrentUser: (user: firebase.User) => void;
}

export enum AuthStoreActionTypes {
  setUserDetails = 'auth/setUserDetails',
  fetchUserProfile = 'auth/fetchUserProfile',
	updateUserProfile = 'auth/updateUserProfile'
}
