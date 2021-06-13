import { APIStatuses } from 'src/shared/models/model';
import firebase from 'firebase';
import User = firebase.User;

export interface AuthState {
    userDetails: {
        userName: string;
        userId: string;
    };
    status: APIStatuses;
    error: string | null;
}

export interface AuthContext {
    currentUser: User;
    // eslint-disable-next-line no-unused-vars
    setCurrentUser: (user: User) => void;
}
