import React, { FC } from 'react';
import { Select } from 'native-base';
import { FormikProps, FormikValues } from 'formik';
import { BasicOption } from '../../models/model';

const FMSelectInput: FC<{
	formik: FormikProps<FormikValues>
	name: string
	options: BasicOption[]
	placeholder: string
}> = ({formik, name, options, placeholder}) => (
	<Select
		selectedValue={formik.values[name]}
		placeholder={placeholder}
		onValueChange={formik.handleChange(name)}
	>
		{options.map((option) => (
			<Select.Item label={option.label} value={option.value} key={option.value}/>
		))}
	</Select>
)

export default FMSelectInput;
