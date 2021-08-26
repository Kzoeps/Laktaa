import React, { FC, useState } from 'react';
import { Select, View, Text, Button } from 'native-base';
import tailwind from 'tailwind-rn';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchInput: FC = () => {
  const [pickDzongkhag, setPickDzongkhag] = useState('');
  const [dropDzongkhag, setDropDzongkhag] = useState('');
  const [selectDate, setSelectDate] = useState('Date');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

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
  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setSelectDate(`${currentDate.getDate()}/${currentDate.getMonth()}`);
    console.log(`this is the dat: ${selectDate}`);
    setShow(false);
  };

  const showCal = () => {
    setShow(true);
  };

  return (
    <>
      <View style={[tailwind('bg-white m-2 flex flex-row justify-center')]}>
        <View alignItems="center">
          <Select
            style={tailwind('text-sm p-1')}
            selectedValue={pickDzongkhag}
            minWidth={120}
            accessibilityLabel="Select the pick up location"
            placeholder="Pick"
            onValueChange={(itemValue: string) => setPickDzongkhag(itemValue)}
          >
            {dzongkhag.map((item) => (
              <Select.Item label={item} value={item} />
            ))}
          </Select>
        </View>

        <View alignItems="center" style={[tailwind('mx-2')]}>
          <Select
            style={tailwind('text-sm p-1')}
            selectedValue={dropDzongkhag}
            minWidth={120}
            accessibilityLabel="Select the drop off location"
            placeholder="Drop"
            onValueChange={(itemValue: string) => setDropDzongkhag(itemValue)}
          >
            {dzongkhag.map((item) => (
              <Select.Item label={item} value={item} />
            ))}
          </Select>
        </View>

        {show && (
          <View alignItems="center">
            <DateTimePicker
              value={date}
              display="calendar"
              onChange={dateChange}
            />
          </View>
        )}
        <View
          style={[
            tailwind(
              'h-10 py-2 px-1 text-sm border border-gray-200 w-3/12 rounded-md'
            ),
          ]}
        >
          <TouchableOpacity
            onPress={showCal}
            style={tailwind('flex-row justify-between')}
          >
            <Text>{selectDate}</Text>
            <View>
              <FontAwesome name="calendar" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* border for the horizontal divide line */}
      <View style={tailwind('border-b mx-5 border-gray-300 my-2')} />
    </>
  );
};

export default SearchInput;
