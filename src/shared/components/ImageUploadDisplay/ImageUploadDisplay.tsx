import { TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import React, { FC } from 'react';
import { Icon, Text } from 'native-base';
import { Entypo } from '@expo/vector-icons';

/**
 *
 * @param label: main display label to show
 * @param callbackFunction: function to run when the icon or action is clicked.
 * @param icon: if you're fine with the Entypo icon then just use this. If thats not what you want then provide icon placement
 * @param iconPlacement: Icon JSX Element. Eg: <MaterialIcon name='camera'>
 * @constructor
 */
const FMImageUploadDisplay: FC<{
  label?: string;
  callback: () => any;
  icon?: string;
  iconPlacement?: JSX.Element;
  styleProp?: string;
}> = ({
  label,
  callback: callbackFunction,
  icon,
  iconPlacement,
  styleProp,
}) => (
  <TouchableOpacity
    onPress={callbackFunction}
    style={[
      tailwind(`${styleProp || ''}`),
      {
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: 1,
      },
    ]}
  >
    <Text style={tailwind('text-center')}>{label || 'Take a picture!'}</Text>
    <Text style={tailwind('text-center mt-4')}>
      <Icon
        as={iconPlacement || <Entypo name={icon || 'camera'} />}
        size="md"
        _light={{
          color: 'grey',
        }}
      />
    </Text>
  </TouchableOpacity>
);

export default FMImageUploadDisplay;
