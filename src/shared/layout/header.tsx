import React from 'react';
import { View } from 'native-base';
import tailwind from 'tailwind-rn';

const HeaderLayout = ({ children }) => (
  <View>
    <View style={tailwind('bg-green-400 px-5 py-1')}>
      <View style={tailwind('pt-10 pb-16')}>{children}</View>
    </View>
  </View>
);

export default HeaderLayout;
