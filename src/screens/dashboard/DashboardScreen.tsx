import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Container, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { AuthContext } from '../auth/auth';
import { selectUserDetails } from '../auth/store/authSlice';
import { UserDetails } from '../auth/models/models';

const DashboardScreen: FC = () => {
  const [shouldLogout, setShouldLogout] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (shouldLogout) logout();
  }, [shouldLogout, logout]);
  return (
    <Container>
      <Text>THIS IS DASHBOARD SCREEN AND WORKS</Text>
      <Button onPress={() => setShouldLogout(true)}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
};

export default DashboardScreen;
