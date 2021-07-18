import React, { FC } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { Box, Icon, Input, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const FMTextInput: FC<{
	label: string;
	formik: FormikProps<FormikValues>;
	name: string;
	icon?: string
}> = ({ label, formik, name, icon }) => (
	<Box w='100%'>
		<Input
			InputLeftElement={
				icon ?
					<Icon
						as={<MaterialIcons name={icon} />}
						size='md'
						_light={{
							color: 'white',
						}}
					/> : undefined
			}
			variant='underlined'
			placeholder={label}
			onChangeText={formik.handleChange(name)}
		/>
		{formik.touched[name] && formik.errors[name] && (
			<Text>{formik.errors[name]}</Text>
		)}
	</Box>
);

export default FMTextInput;
