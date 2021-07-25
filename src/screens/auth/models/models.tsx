import { APIStatuses } from 'src/shared/models/model';
import firebase from 'firebase';
import User = firebase.User;

export interface AuthState {
  userDetails: UserDetails
  status: APIStatuses;
  error: string | null;
}

export interface UserDetails {
	userName: string,
	userId?: string,
	location: string,
	email: string
}

export interface AuthContext {
  currentUser: User;
  // eslint-disable-next-line no-unused-vars
  setCurrentUser: (user: User) => void;
}

export enum AuthStoreActionTypes {
	setUserDetails = 'auth/setUserDetails'
}
