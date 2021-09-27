import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import tailwind from 'tailwind-rn';

const Calendar = () => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
    console.log(`this is the date: ${date}`);
  };

  return (
    <View>
      {/* The button that used to trigger the date picker */}
      {!isPickerShow && (
        <>
          <View>
            {/* <Button
              title={`${date.getDate()} - ${
                date.getMonth() + 1
              } - ${date.getFullYear()}`}
              color="purple"
              onPress={showPicker}
            /> */}
            <TouchableOpacity
              onPress={showPicker}
              style={tailwind('flex-row justify-between')}
            >
              <Text>
                {`${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`}
              </Text>
              <View>
                <FontAwesome name="calendar" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

// just add some styles to make our app look more beautiful
// This is not the focus of this article
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default Calendar;
