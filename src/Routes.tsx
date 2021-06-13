import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import { Text } from 'native-base';
import { AuthContext } from './screens/auth/auth';
import AuthStack from './screens/auth/AuthStack';
import AppStack from './screens/AppStack';

const Routes = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [pending, setPending] = useState<boolean>(true);
  useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onAuthStateChanges = (user) => {
      setCurrentUser(user);
      setPending(false);
    };
    firebase.auth().onAuthStateChanged(onAuthStateChanges);
  }, []);
  if (pending) return <Text>Loading...</Text>;
  return (
    <NavigationContainer>
      {currentUser ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
