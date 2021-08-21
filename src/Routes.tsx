import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';
import AuthStack from './screens/auth/AuthStack';
import AppStack from './screens/AppStack';
import { AuthContext } from './screens/auth/auth';

const Routes = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  useEffect((): void => {
    const onAuthStateChanges = (user: User | null) => {
      setCurrentUser(user);
    };
    firebase.auth().onAuthStateChanged(onAuthStateChanges);
  }, [setCurrentUser]);
  return (
    <NavigationContainer>
      {currentUser ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
