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

const Calendar = (props) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  if (props.value !== '') {
    setShowPlaceholder(false);
  }

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
    props.setDate(value);
    setShowPlaceholder(false);
  };

  return (
    <View>
      {/* The button that used to trigger the date picker */}
      {!isPickerShow && (
        <>
          <View>
            <TouchableOpacity
              onPress={showPicker}
              style={tailwind('flex-row justify-between')}
            >
              <Text>
                {showPlaceholder
                  ? props.placeholder
                  : `${date.getDate()}/${
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

export default Calendar;
