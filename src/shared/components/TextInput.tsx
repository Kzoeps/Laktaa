import React, { FC } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { Box, Icon, Input, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';

const FMTextInput: FC<{
  label: string;
  formik: FormikProps<FormikValues>;
  name: string;
  icon?: string;
  doNotShow?: boolean;
  styleProp?: string;
  disableInput?: boolean;
  inputColor?: string;
  iconPlacement?: JSX.Element;
}> = ({
  label,
  formik,
  name,
  icon,
  doNotShow,
  styleProp,
  disableInput,
  iconPlacement,
  inputColor,
}) => (
  <Box w="90%" style={tailwind(styleProp ?? '')}>
    <Input
      InputLeftElement={
        icon ? (
          <Icon
            as={iconPlacement || <MaterialIcons name={icon} />}
            size="md"
            _light={{
              color: inputColor || 'white',
            }}
          />
        ) : undefined
      }
      isDisabled={!!disableInput}
      value={formik.values[name]}
      type={doNotShow ? 'password' : 'text'}
      variant="underlined"
      bg="transparent"
      placeholder={label}
      onChangeText={formik.handleChange(name)}
    />
    {formik.touched[name] && formik.errors[name] && (
      <Text>{formik.errors[name]}</Text>
    )}
  </Box>
);

export default FMTextInput;
