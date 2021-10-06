import React, { FC } from 'react';
import { Select, Icon, Text } from 'native-base';
import { FormikProps, FormikValues } from 'formik';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BasicOption } from '../../models/model';
import tailwind from 'tailwind-rn';

const FMSelectInput: FC<{
  formik: FormikProps<FormikValues>;
  name: string;
  options: BasicOption[];
  placeholder: string;
  icon?: string;
  iconPlacement?: JSX.Element;
  inputColor?: string;
}> = ({
  formik,
  name,
  options,
  placeholder,
  icon,
  iconPlacement,
  inputColor,
}) => (
  <>
    <Select
      selectedValue={formik.values[name]}
      placeholder={placeholder}
      onValueChange={formik.handleChange(name)}
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
    >
      {options.map((option) => (
        <Select.Item
          label={option.label}
          value={option.value}
          key={option.value}
        />
      ))}
    </Select>
    {formik.touched[name] && formik.errors[name] && (
      <Text style={tailwind('text-red-400')}>{formik.errors[name]}</Text>
    )}
  </>
);

export default FMSelectInput;
