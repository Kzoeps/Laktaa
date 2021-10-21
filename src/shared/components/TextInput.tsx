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
  inputColor?: string;
  iconPlacement?: JSX.Element;
  variant?: string;
  disableInput?: boolean;
  color?: string;
	placeholderTextColor?: string
}> = ({
  label,
  formik,
  name,
  icon,
  doNotShow,
  inputColor,
  styleProp,
  iconPlacement,
  variant,
  disableInput,
	color,
	placeholderTextColor
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
      variant={variant || 'outline'}
      bg="transparent"
			placeholderTextColor={placeholderTextColor || "gray"}
      placeholder={label}
      onChangeText={formik.handleChange(name)}
			color={color || 'black'}
    />
    {formik.touched[name] && formik.errors[name] && (
      <Text style={tailwind('text-red-400')}>{formik.errors[name]}</Text>
    )}
  </Box>
);

export default FMTextInput;
