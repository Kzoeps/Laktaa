import React, { FC } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { Box, Icon, Input, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import tailwind from 'tailwind-rn';
import { Picker } from '@react-native-picker/picker';

const loadType = [{ name: 'Perishibale' }, { name: 'Non-perishable' }];
const FMTextInput: FC<{
  label: string;
  formik: FormikProps<FormikValues>;
  name: string;
  icon?: string;
  doNotShow?: boolean;
  styleProp?: string;
  inputColor?: string;
}> = ({ label, formik, name, icon, doNotShow, inputColor, styleProp }) => (
  <Box w="98%" style={tailwind(styleProp ?? '')}>
    <Input
      InputLeftElement={
        icon ? (
          <Icon
            as={<MaterialIcons name={icon} />}
            size="md"
            _light={{
              color: inputColor || 'white',
            }}
          />
        ) : undefined
      }
      type={doNotShow ? 'password' : 'text'}
      variant="underlined"
      placeholder={label}
      onChangeText={formik.handleChange(name)}
    />

    {formik.touched[name] && formik.errors[name] && (
      <Text>{formik.errors[name]}</Text>
    )}
  </Box>
);

export default FMTextInput;
