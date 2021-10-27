import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';

const HomeNavigation = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Dashboard')}
    style={tailwind('ml-4')}
  >
    <AntDesign name="home" size={24} color="black" />
  </TouchableOpacity>
);

export default HomeNavigation;
