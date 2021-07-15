import React, { FC, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content, Text, View } from 'native-base';
import tailwind from 'tailwind-rn';
import { AuthContext } from '../auth/auth';
import Pageheader from '../../shared/components/Pageheader/Pageheader';

const DashboardScreen: FC = () => {
  const [shouldLogout, setShouldLogout] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);
  const data = {};

  useEffect(() => {
    if (shouldLogout) logout();
  }, [shouldLogout, logout]);

  return (
    <Container>
      <Content>
        <Pageheader navigation page="dashboard" />
        <View
          style={[
            tailwind('bg-white px-5 py-3 pb-3 -my-10 rounded-t-3xl '),
            { height: Dimensions.get('window').height },
          ]}
        >
          <Text>yo yo man </Text>
          <Text>yo yo man </Text>
          <Text>yo yo man </Text>
          <Text>yo yo man </Text>
          <Text>yo yo man </Text>
        </View>
      </Content>

      <View
        style={tailwind(
          'bg-green-400 px-5 py-3 text-center absolute bottom-0 w-full'
        )}
      >
        <TouchableOpacity>
          <Text style={tailwind('text-white text-center font-semibold')}>
            Post Job
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default DashboardScreen;
