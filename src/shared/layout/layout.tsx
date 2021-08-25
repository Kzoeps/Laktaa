import React, { FC, ReactChild, ReactChildren } from 'react';
import { View } from 'native-base';
import tailwind from 'tailwind-rn';

const Layout: FC<{ children: ReactChild[] | ReactChild; styleProp?: string }> =
  ({ children, styleProp: style }) => (
    <View style={tailwind(`bg-white  pb-3 mt-3 rounded-t-3xl ${style ?? ''}`)}>
      {children}
    </View>
  );

export default Layout;
