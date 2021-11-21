import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/screens/auth/auth';
import Routes from './src/Routes';
import store from './src/store/store';

const firebaseConfig = {
	apiKey: 'AIzaSyBvrqnGN1U9Hwwub_HHZCtkxlAnonXqS6A',
	authDomain: 'laktaa-93b11.firebaseapp.com',
	projectId: 'laktaa-93b11',
	storageBucket: 'laktaa-93b11.appspot.com',
	messagingSenderId: '533917489363',
	appId: '1:533917489363:web:abdadb86cd4131b0e45c26',
	measurementId: 'G-9DHBZFTPCQ',
};

firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);

export default function App() {
  // eslint-disable-next-line no-console
  console.disableYellowBox = true;
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Provider>
    </NativeBaseProvider>
  );
}
