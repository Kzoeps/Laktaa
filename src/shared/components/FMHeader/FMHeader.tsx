import React, { FC } from 'react';
import { Text } from 'native-base';
import tailwind from 'tailwind-rn';

const FMHeader: FC<{ header: string }> = ({ header }) => (
  <Text color="white" style={tailwind('w-full h-10 text-2xl m-0 mt-3 ml-5')}>
    {header}
  </Text>
);

export default FMHeader;
