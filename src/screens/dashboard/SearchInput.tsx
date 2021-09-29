import React, { FC, useState } from 'react';
import { Dimensions } from 'react-native';
import { Select, View, Text } from 'native-base';
import tailwind from 'tailwind-rn';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DZONGKHAG_GEWOG } from '../../shared/models/constants';
import Calendar from '../../shared/components/Calendar/calendar';

const SearchInput: FC<{ filters: Record<string, unknown>; setFilters: any }> =
  ({ filters, setFilters }) => {
    const searchFieldWidth = Dimensions.get('window').width / 2.3;

    const [pickDzongkhag, setPickDzongkhag] = useState('');
    const [dropDzongkhag, setDropDzongkhag] = useState('');
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const changeFromDate = (value: Date) => {
      setFromDate(value);
      setFilters({ ...filters, fromDate: value });
      console.log(value);
    };
    const changeToDate = (value: Date) => {
      setToDate(value);
      setFilters({ ...filters, toDate: value });
      console.log(value);
    };

    return (
      <View>
        <View
          style={tailwind('bg-white mx-2 mt-2 flex flex-row justify-center')}
        >
          <View alignItems="center">
            <Select
              style={tailwind('text-sm p-1')}
              selectedValue={pickDzongkhag}
              minWidth={searchFieldWidth}
              accessibilityLabel="Select the pick up location"
              placeholder="Pick"
              onValueChange={(itemValue: string) => {
                setPickDzongkhag(itemValue);
                setFilters({ ...filters, pickUpLocation: itemValue });
              }}
            >
              {DZONGKHAG_GEWOG.dzongkhag.map((item) => (
                <Select.Item
                  label={item.label}
                  value={item.value}
                  key={item.value}
                />
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
              onValueChange={(itemValue: string) => {
                setDropDzongkhag(itemValue);
                setFilters({ ...filters, dropOffLocation: itemValue });
              }}
            >
              {DZONGKHAG_GEWOG.dzongkhag.map((item) => (
                <Select.Item
                  label={item.label}
                  value={item.value}
                  key={item.value}
                />
              ))}
            </Select>
          </View>
        </View>
        <View style={tailwind('bg-white m-2 flex flex-row justify-center')}>
          <View>
            <Calendar value="" setDate={changeFromDate} />
          </View>
          <View>
            <Text>---</Text>
          </View>
          <View>
            <Calendar value="" setDate={changeToDate} />
          </View>
        </View>
        {/* border for the horizontal divide line */}
        <View style={tailwind('border-b mx-5 border-gray-300 my-2')} />
      </View>
    );
  };

export default SearchInput;
