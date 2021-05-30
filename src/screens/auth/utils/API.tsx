import firebase from 'firebase'

export default {
    signIn: (
        phoneNumber: string,
        applicationVerifier: firebase.auth.ApplicationVerifier
    ): Promise<firebase.auth.ConfirmationResult> =>
        firebase.auth().signInWithPhoneNumber(phoneNumber, applicationVerifier),
    confirmCode: (
        confirmation: firebase.auth.ConfirmationResult,
        code: string
    ): Promise<firebase.auth.UserCredential> => confirmation.confirm(code),
}
