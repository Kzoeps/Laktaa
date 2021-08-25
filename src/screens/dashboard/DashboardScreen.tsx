import React, { FC, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from 'native-base';
import tailwind from 'tailwind-rn';
import { AuthContext } from '../auth/auth';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import SearchInput from './SearchInput';
import JobCard from './JobCard';
import Layout from '../../shared/layout/layout';

const DashboardScreen: FC = ({ navigation }) => {
  const [shouldLogout, setShouldLogout] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (shouldLogout) logout();
  }, [shouldLogout, logout]);

  return (
    <>
      <ScrollView>
        <View style={tailwind('-mb-20')}>
          <Pageheader navigation page="dashboard" />
        </View>
        <Layout styleProp="h-full">
          <View style={tailwind('my-2')}>
            <SearchInput />
          </View>
          <JobCard />
        </Layout>
      </ScrollView>

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
    </>
  );
};

export default DashboardScreen;
