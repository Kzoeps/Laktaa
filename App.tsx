import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';
import { AuthProvider } from './src/screens/auth/auth';
import Routes from './src/Routes';
import store from './src/store/store';

const firebaseConfig = {
  apiKey: 'AIzaSyA-2HCXx0jV5d9OIyTPOO1Xk6kLZubxm2M',
  authDomain: 'first-mile-7bd71.firebaseapp.com',
  projectId: 'first-mile-7bd71',
  storageBucket: 'first-mile-7bd71.appspot.com',
  messagingSenderId: '52636116402',
  appId: '1:52636116402:web:31ce398c0fa3d7909630ab',
  measurementId: 'G-EH7G5V096G',
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  const [loaded] = useFonts({
    // eslint-disable-next-line global-require
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    // eslint-disable-next-line global-require
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });
  if (!loaded) return <Text>Loading ...</Text>;
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  );
}
