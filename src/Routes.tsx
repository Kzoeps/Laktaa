import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthStack from './screens/auth/AuthStack';
import AppStack from './screens/AppStack';
import { selectUserDetails } from './screens/auth/store/authSlice';

const Routes = (): JSX.Element => {
  // Possibly memory leak here check back
  const userDetails = useSelector(selectUserDetails);

  return (
    <NavigationContainer>
      {userDetails.userName ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
