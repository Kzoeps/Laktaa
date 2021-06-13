import firebase from 'firebase';

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
};
