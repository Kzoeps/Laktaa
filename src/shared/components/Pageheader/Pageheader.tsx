import React, { useState } from 'react';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import HeaderLayout from '../../layout/header';

const Pageheader = ({ navigation, page }): JSX.Element => {
  const [customer, setCustomer] = useState(true);
  const [driver, setDriver] = useState(false);

  const toggleCustomer = () => {
    setCustomer(true);
    setDriver(false);
  };
  const toggleDriver = () => {
    setCustomer(false);
    setDriver(true);
  };

  return page === 'dashboard' ? (
    <HeaderLayout>
      <View
        style={tailwind(
          'px-1 py-1 rounded-full border-2 border-white flex-row'
        )}
      >
        <Text
          onPress={toggleCustomer}
          style={
            customer
              ? tailwind(
                  'text-green-400 bg-white font-semibold px-2 py-1 rounded-full w-6/12 text-center '
                )
              : tailwind(
                  'text-white  font-semibold px-2 py-1 rounded-full w-6/12 text-center'
                )
          }
        >
          Customer
        </Text>
        <Text
          onPress={toggleDriver}
          style={
            driver
              ? tailwind(
                  'text-green-400 bg-white font-semibold px-2 py-1 rounded-full w-6/12 text-center '
                )
              : tailwind(
                  'text-white  font-semibold px-2 py-1 rounded-full w-6/12 text-center '
                )
          }
        >
          Driver
        </Text>
      </View>
    </HeaderLayout>
  ) : (
    <HeaderLayout>
      <View>
        <Text style={tailwind('text-white text-xl')}>{page}</Text>
      </View>
    </HeaderLayout>
  );
};

export default Pageheader;
