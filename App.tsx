import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { AuthProvider } from 'src/screens/auth/auth';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import store from './src/store/store';

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AuthProvider>
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Sign Up" component={SignUpScreen} />
                    </Stack.Navigator>
                </AuthProvider>
            </NavigationContainer>
        </Provider>
    );
}
