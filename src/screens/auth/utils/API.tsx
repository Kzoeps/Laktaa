import firebase from 'firebase'
export default {
    signIn: (phoneNumber: string) =>
        firebase.auth().signInWithPhoneNumber(phoneNumber),
}
