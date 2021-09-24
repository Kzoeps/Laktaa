import React, { FC, ReactChild, ReactChildren } from 'react';
import { View } from 'native-base';
import tailwind from 'tailwind-rn';

const Layout = ({ children }) => (
  <View style={tailwind('bg-white pb-3 my-10 rounded-t-3xl ')}>{children}</View>
);

export default Layout;
