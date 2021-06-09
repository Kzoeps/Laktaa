import * as firebase from 'firebase';

// REVISIT KARMA: Import only required modules once in production
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA-2HCXx0jV5d9OIyTPOO1Xk6kLZubxm2M',
    authDomain: 'first-mile-7bd71.firebaseapp.com',
    projectId: 'first-mile-7bd71',
    storageBucket: 'first-mile-7bd71.appspot.com',
    messagingSenderId: '52636116402',
    appId: '1:52636116402:web:31ce398c0fa3d7909630ab',
    measurementId: 'G-EH7G5V096G',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default { firebase };
