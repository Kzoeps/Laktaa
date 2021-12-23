import React, { FC } from 'react';
import { FormikProps, FormikValues } from 'formik';
import tailwind from 'tailwind-rn';
import { Button, View } from 'native-base';
import FMTextInput from '../../../shared/components/TextInput';

const OtpGenerator: FC<{ formik: FormikProps<Record<string, unknown> & { phoneNumber: string }>, onOtpGenerate: (phoneNumber: string) => void, showLoader: boolean }> = ({
																																																																								 formik,
																																																																								 onOtpGenerate,
																																																																								 showLoader,
																																																																							 }) => {
	return (
		<>
			<View style={tailwind('w-8/12')}>
				<FMTextInput
					placeholderTextColor='white'
					label='Phone Number' formik={formik as unknown as FormikProps<FormikValues>} name='phoneNumber'
					icon='phone' />
			</View>
			<Button
				size='xs'
				style={tailwind('w-4/12')}
				isLoading={showLoader}
				onPress={() => {
					onOtpGenerate(formik.values.phoneNumber);
				}}
			>
				Create OTP
			</Button>
		</>

	);
};

export default OtpGenerator;
