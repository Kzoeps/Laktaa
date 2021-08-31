import React, { FC, useState } from 'react';
import { Dimensions } from 'react-native';
import { Select, View, Text } from 'native-base';
import tailwind from 'tailwind-rn';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DZONGKHAG_GEWOG } from '../../shared/models/constants';

const SearchInput: FC = () => {
  const [pickDzongkhag, setPickDzongkhag] = useState('');
  const [dropDzongkhag, setDropDzongkhag] = useState('');
  const searchFieldWidth = Dimensions.get('window').width / 2.3;

  const [selectFromDate, setSelectFromDate] = useState('From Date');
  const [fromDate, setFromDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);
  const [selectToDate, setSelectToDate] = useState('From Date');
  const [toDate, setToDate] = useState(new Date());
  const [toShow, setToShow] = useState(false);

  const fromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromDate(currentDate);
    setSelectFromDate(
      `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`
    );
    setFromShow(false);
  };

  const toDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setToDate(currentDate);
    setSelectToDate(
      `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`
    );
    setToShow(false);
  };

  const showCal = (condition: string) => {
    if (condition === 'from') {
      setFromShow(true);
    } else if (condition === 'to') {
      setToShow(true);
    }
  };

  return (
    <>
      <View style={tailwind('bg-white mx-2 mt-2 flex flex-row justify-center')}>
        <View alignItems="center">
          <Select
            style={tailwind('text-sm p-1')}
            selectedValue={pickDzongkhag}
            minWidth={searchFieldWidth}
            accessibilityLabel="Select the pick up location"
            placeholder="Pick"
            onValueChange={(itemValue: string) => setPickDzongkhag(itemValue)}
          >
            {DZONGKHAG_GEWOG.dzongkhag.map((item) => (
              <Select.Item label={item.label} value={item.value} />
            ))}
          </Select>
        </View>

        <View alignItems="center">
          <Select
            style={tailwind('text-sm p-1')}
            selectedValue={dropDzongkhag}
            minWidth={searchFieldWidth}
            accessibilityLabel="Select the drop off location"
            placeholder="Drop"
            onValueChange={(itemValue: string) => setDropDzongkhag(itemValue)}
          >
            {DZONGKHAG_GEWOG.dzongkhag.map((item) => (
              <Select.Item label={item.label} value={item.value} />
            ))}
          </Select>
        </View>

        {(fromShow || toShow) && (
          <View alignItems="center">
            <DateTimePicker
              value={fromShow ? fromDate : toDate}
              display="calendar"
              onChange={fromShow ? fromDateChange : toDateChange}
            />
          </View>
        )}
      </View>
      <View style={tailwind('bg-white m-2 flex flex-row justify-center')}>
        <View
          style={[
            tailwind(
              'h-10 py-2 px-1 text-sm border border-gray-200 rounded-md'
            ),
            { width: searchFieldWidth },
          ]}
        >
          <TouchableOpacity
            onPress={() => showCal('from')}
            style={tailwind('flex-row justify-between')}
          >
            <Text>{selectFromDate}</Text>
            <View>
              <FontAwesome name="calendar" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            tailwind(
              'h-10 py-2 px-1 text-sm border border-gray-200 rounded-md'
            ),
            { width: searchFieldWidth },
          ]}
        >
          <TouchableOpacity
            onPress={() => showCal('to')}
            style={tailwind('flex-row justify-between')}
          >
            <Text>{selectToDate}</Text>
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
