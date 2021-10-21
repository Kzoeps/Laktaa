import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';
import { useDispatch } from 'react-redux';
import { LogBox } from 'react-native';
import AuthStack from './screens/auth/AuthStack';
import AppStack from './screens/AppStack';
import { AuthContext } from './screens/auth/auth';
import { fetchUserProfile } from './screens/auth/store/authSlice';

const Routes = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  LogBox.ignoreLogs(['Setting a timer']);
  useEffect(() => {
    const onAuthStateChanges = (user: User | null) => {
      // eslint-disable-next-line no-unused-expressions
      if (currentUser?.phoneNumber !== user?.phoneNumber) {
				if (user?.displayName) dispatch(fetchUserProfile(user?.phoneNumber as string));
			}
      setCurrentUser(user);
    };
    firebase.auth().onAuthStateChanged(onAuthStateChanges);
  }, [currentUser?.phoneNumber, dispatch, setCurrentUser]);
  return (
    <NavigationContainer>
      {currentUser ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
