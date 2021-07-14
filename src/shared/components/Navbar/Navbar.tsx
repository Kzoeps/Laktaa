import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';

const Navbar = ({ navigation }): JSX.Element => (
  // <View style={tailwind('w-full pt-12 items-center')}>
  <View>
    <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
      <Text style={tailwind('text-blue-800 font-semibold')}>
        Hello Taasdasdasilwind
      </Text>
    </View>
  </View>
);

export default Navbar;
