import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from 'src/screens/auth/AuthStack.tsx.ts';

const Routes = (): JSX.Element => (
    <NavigationContainer>
        <AuthStack />
    </NavigationContainer>
);

export default Routes;
