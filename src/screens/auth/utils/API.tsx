import firebase from 'firebase'

export default {
    signIn: (
        phoneNumber: string,
        applicationVerifier: firebase.auth.ApplicationVerifier
    ) =>
        firebase.auth().signInWithPhoneNumber(phoneNumber, applicationVerifier),
}
