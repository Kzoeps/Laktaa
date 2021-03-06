import React, { FC, useContext, useEffect, useState } from 'react';
import { Box, Icon, Select } from 'native-base';
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import { string } from 'yup';

const SelectInput: FC = ({
  icon,
  selectedValue,
  setValue,
  options,
  placeHolderValue,
  iconPlacement,
}) => (
  <Box style={tailwind('py-2 w-10/12 flex-row ')}>
    {icon ? (
      <Icon
        style={tailwind('mr-3 my-3')}
        as={iconPlacement || <MaterialIcons name={icon} />}
        size="md"
        _light={{
          color: 'grey',
        }}
      />
    ) : undefined}
    <Select
      minWidth={200}
      width="97%"
      selectedValue={selectedValue}
      placeholder={placeHolderValue}
      onValueChange={(itemValue: string) => setValue(itemValue)}
    >
      {options.map((item: { name: string }) => (
        <Select.Item label={item.name} value={item.name} key={item.name} />
      ))}
    </Select>
  </Box>
);

export default SelectInput;
