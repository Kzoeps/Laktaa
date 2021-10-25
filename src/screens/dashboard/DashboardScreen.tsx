import React, { FC, useContext, useEffect, useState, useRef } from 'react';
import { TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Text, View } from 'native-base';
import tailwind from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../auth/auth';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import SearchInput from './SearchInput';
import JobCard from './JobCard';
import Layout from '../../shared/layout/layout';
import { fetchJobs, selectJobs } from './store/dashboardSlice';
import { fetchUserProfile, selectUserDetails } from '../auth/store/authSlice';

const DashboardScreen: FC = ({ navigation }) => {
  const { userEmail } = useContext(AuthContext);
  const [shouldLogout, setShouldLogout] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const userDetails = useSelector(selectUserDetails);
  console.log('====> ', userDetails);
  const [filters, setFilters] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const ref = useRef(null);

  useEffect(() => {
    dispatch(fetchJobs(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchUserProfile(userEmail));
  }, [userEmail, dispatch]);

  const onRefresh = () => {
    setFilters({});
    dispatch(fetchJobs(filters));
    ref.current.initializeFilters();
  };

  useEffect(() => {
    if (shouldLogout) logout();
  }, [shouldLogout, logout]);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={tailwind('-mb-20')}>
          <Pageheader
            navigation={navigation}
            page="dashboard"
            activeTab="customer"
          />
        </View>
        <Layout styleProp="h-full">
          <View style={tailwind('my-2')}>
            <SearchInput filters={filters} setFilters={setFilters} ref={ref} />
          </View>
          <JobCard
            data={jobs}
            navigation={navigation}
            registeredDriver={userDetails.registeredDriver}
          />
        </Layout>
      </ScrollView>

      <View
        style={tailwind(
          'bg-green-400 px-5 py-3 text-center absolute bottom-0 w-full'
        )}
      >
        <TouchableOpacity onPress={() => navigation.navigate('PostJob')}>
          <Text style={tailwind('text-white text-center font-semibold')}>
            Post Job
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DashboardScreen;
