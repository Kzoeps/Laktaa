import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { AuthProvider } from './src/screens/auth/auth';
import Routes from './src/Routes';
import store from './src/store/store';

export default function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </Provider>
    );
}
