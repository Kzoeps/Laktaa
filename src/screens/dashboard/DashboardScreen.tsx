import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Container, Content, Text } from 'native-base';
import { AuthContext } from '../auth/auth';

const DashboardScreen: FC = () => {
  const [shouldLogout, setShouldLogout] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    if (shouldLogout) logout();
  }, [shouldLogout, logout]);
  return (
    <Container>
      <Content>
        <Text>THIS IS DASHBOARD SCREEN AND WORKS</Text>
        <Button onPress={() => setShouldLogout(true)}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default DashboardScreen;
