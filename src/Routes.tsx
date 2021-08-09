import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';
import { useDispatch } from 'react-redux';
import AuthStack from './screens/auth/AuthStack';
import AppStack from './screens/AppStack';
import { AuthContext } from './screens/auth/auth';
import { fetchUserProfile } from './screens/auth/store/authSlice';

const Routes = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect((): void => {
    const onAuthStateChanges = (user: User | null) => {
			// eslint-disable-next-line no-unused-expressions
    	currentUser?.email !== user?.email && dispatch(fetchUserProfile(user?.email as string));
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
