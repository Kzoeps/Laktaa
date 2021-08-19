import React, { FC, useState } from 'react';
import { Select, CheckIcon, View } from 'native-base';
import tailwind from 'tailwind-rn';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchInput: FC = () => {
  let [pickDzongkhag, setPickDzongkhag] = useState('');
  let [dropDzongkhag, setDropDzongkhag] = useState('');
  const dzongkhag = [
    'All',
    'B/thang',
    'Chhukha',
    'Dagana',
    'Gasa',
    'Haa',
    'Lhuentse',
    'Mongar',
    'Paro',
    'P/Gatshel',
    'Punakha',
    'S/Jongkhar',
    'Samtse',
    'Sarpang',
    'Thimphu',
    'T/gang',
    'T/Yangtse',
    'Trongsa',
    'Tsirang',
    'W/Phodrang',
    'Zhemgang',
  ];

  return (
    <View style={[tailwind('bg-white m-2 flex flex-row justify-center')]}>
      <View alignItems="center">
        <Select
          style={tailwind('text-sm p-1')}
          selectedValue={pickDzongkhag}
          minWidth={120}
          accessibilityLabel="Select the pick up location"
          placeholder="Pick"
          onValueChange={(itemValue) => setPickDzongkhag(itemValue)}
        >
          {dzongkhag.map((item) => (
            <Select.Item label={item} value={item} />
          ))}
        </Select>
      </View>

      <View alignItems="center">
        <Select
          style={tailwind('text-sm p-1')}
          selectedValue={dropDzongkhag}
          minWidth={120}
          accessibilityLabel="Select the drop off location"
          placeholder="Drop"
          onValueChange={(itemValue) => setDropDzongkhag(itemValue)}
        >
          {dzongkhag.map((item) => (
            <Select.Item label={item} value={item} />
          ))}
        </Select>
      </View>
      <View alignItems="center">
        <Select
          style={tailwind('text-sm p-1')}
          selectedValue={pickDzongkhag}
          minWidth={120}
          accessibilityLabel="Select the delivery date"
          placeholder="Date"
          onValueChange={(itemValue) => setPickDzongkhag(itemValue)}
        >
          {dzongkhag.map((item) => (
            <Select.Item label={item} value={item} />
          ))}
        </Select>
      </View>
    </View>
  );
};

export default SearchInput;
