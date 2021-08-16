import React, { FC } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { Box, Icon, Input, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import tailwind from 'tailwind-rn';

const FMTextInput: FC<{
  label: string;
  formik: FormikProps<FormikValues>;
  name: string;
  icon?: string;
  doNotShow?: boolean;
  styleProp?: string;
  disableInput?: boolean;
}> = ({ label, formik, name, icon, doNotShow, styleProp, disableInput }) => (
  <Box w="90%" style={tailwind(styleProp ?? '')}>
    <Input
      InputLeftElement={
        icon ? (
          <Icon
            as={<MaterialIcons name={icon} />}
            size="md"
            _light={{
              color: 'white',
            }}
          />
        ) : undefined
      }
      isDisabled={!!disableInput}
      value={formik.values[name]}
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
