import firebase from 'firebase';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { ProfileUpdatePayload, UserDetails } from '../models/models';

// eslint-disable-next-line import/prefer-default-export
export const FIREBASE_CALLS = {
  signIn: (
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier
  ): Promise<firebase.auth.ConfirmationResult> =>
    firebase.auth().signInWithPhoneNumber(phoneNumber, applicationVerifier),
  confirmCode: (
    confirmation: firebase.auth.ConfirmationResult,
    code: string
  ): Promise<firebase.auth.UserCredential> => confirmation.confirm(code),
  signUpWithEmail: (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> =>
    firebase.auth().createUserWithEmailAndPassword(email, password),
  signInWithEmail: (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> =>
    firebase.auth().signInWithEmailAndPassword(email, password),
  logout: (): Promise<void> => firebase.auth().signOut(),
  createUserProfile: ({
    email,
    userName,
    location,
  }: {
    email: string;
    location: string;
    userName: string;
  }): Promise<void> =>
    firebase.firestore().collection(email).doc('userProfile').set({
      email,
      userName,
      location,
    }),
  getUserProfile: (email: string): Promise<DocumentSnapshot<UserDetails>> =>
    firebase.firestore().collection(email).doc('userProfile').get() as Promise<
      DocumentSnapshot<UserDetails>
    >,
  updateUserProfile: (userDetails: UserDetails): Promise<void> =>
    firebase
      .firestore()
      .collection(userDetails.email)
      .doc('userProfile')
      .update({
        userName: userDetails.userName,
        location: userDetails.location,
        phoneNumber: userDetails.phoneNumber,
      }),
  updateUserProfileImage: ({
    email,
    profileImageUrl,
  }: ProfileUpdatePayload): Promise<void> =>
    firebase.firestore().collection(email).doc('userProfile').update({
      profileImageUrl,
    }),
};
