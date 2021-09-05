import React, { FC } from 'react';
import { Select } from 'native-base';
import { FormikProps, FormikValues } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BasicOption } from '../../models/model';

const FMSelectInput: FC<{
  formik: FormikProps<FormikValues>;
  name: string;
  options: BasicOption[];
  placeholder: string;
  icon?: string;
  iconPlacement?: JSX.Element;
}> = ({ formik, name, options, placeholder, icon, iconPlacement }) => (
  <Select
    dropdownIcon={
      icon || iconPlacement
        ? iconPlacement || <MaterialCommunityIcons name={icon} size={24} />
        : undefined
    }
    selectedValue={formik.values[name]}
    placeholder={placeholder}
    onValueChange={formik.handleChange(name)}
  >
    {options.map((option) => (
      <Select.Item
        label={option.label}
        value={option.value}
        key={option.value}
      />
    ))}
  </Select>
);

export default FMSelectInput;
