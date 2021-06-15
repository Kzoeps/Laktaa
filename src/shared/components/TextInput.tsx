import React, { FC } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { Input, Item, Label, Text } from 'native-base';

const TextInput: FC<{
  label: string;
  formik: FormikProps<FormikValues>;
  name: string;
}> = ({ label, formik, name }) => (
  <>
    <Item floatingLabel>
      <Label>{label}</Label>
      <Input onChangeText={formik.handleChange(name)} />
    </Item>
    {formik.touched[name] && formik.errors[name] && (
      <Text>{formik.errors[name]}</Text>
    )}
  </>
);

export default TextInput;
