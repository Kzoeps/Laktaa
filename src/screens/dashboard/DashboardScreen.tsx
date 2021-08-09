import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Container, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { AuthContext } from '../auth/auth';
import { selectUserDetails } from '../auth/store/authSlice';

const DashboardScreen: FC = ({navigation}) => {
  const [shouldLogout, setShouldLogout] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);
  const details = useSelector(selectUserDetails);
  useEffect(() => {
    if (shouldLogout) logout();
  }, [shouldLogout, logout]);
  return (
    <Container>
      <Text>THIS IS DASHBOARD SCREEN AND WORKS</Text>
      <Text>{details.userName}</Text>
			<Button onPress={() => navigation.navigate('User Profile')}> G0 T0 USER PROFILE</Button>
      <Button onPress={() => setShouldLogout(true)}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
};

export default DashboardScreen;
