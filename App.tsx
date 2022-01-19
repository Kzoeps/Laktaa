import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/screens/auth/auth';
import Routes from './src/Routes';
import store from './src/store/store';

const firebaseConfig = {
  apiKey: 'AIzaSyB6Zx41HqL6LlVaASQwNsXd4J28si0d-8E',
  authDomain: 'laktaa-bht.firebaseapp.com',
  projectId: 'laktaa-bht',
  storageBucket: 'laktaa-bht.appspot.com',
  messagingSenderId: '271533523230',
  appId: '1:271533523230:web:3038bf14cc2deac2b2490f',
  measurementId: 'G-9871Y71LLW',
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
