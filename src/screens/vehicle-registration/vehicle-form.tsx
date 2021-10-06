import { Formik, FormikProps, FormikValues } from 'formik';
import React, { FC, useState } from 'react';
import { Box, Button, ScrollView } from 'native-base';
import tailwind from 'tailwind-rn';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import {
	VEHICLE_REGISTER_INITIALIZER,
	VEHICLE_REGISTRATION_VALIDATION,
	VEHICLE_TYPE_OPTIONS,
} from './models/constants';
import { DriverInfo, VehicleInfo } from './models/models';
import FMTextInput from '../../shared/components/TextInput';
import FMSelectInput from '../../shared/components/SelectInput/FMSelectInput';
import FMImageUploadDisplay from '../../shared/components/ImageUploadDisplay/ImageUploadDisplay';

const VehicleForm: FC<{
	openCamera: () => void,
	openDriverCamera: () => void,
  setRegistrationDetails: (details: { registrationDetails: VehicleInfo & DriverInfo}) => void,
  initialFormValues: DriverInfo & VehicleInfo | undefined
}> = ({ setRegistrationDetails, initialFormValues , openCamera, openDriverCamera }) => {
	const [showCamera, setShowCamera] = useState<boolean>(false);
	const validationSchema = VEHICLE_REGISTRATION_VALIDATION;

	return (
		<>
			<ScrollView>
				<Formik
					initialValues={(initialFormValues ?? VEHICLE_REGISTER_INITIALIZER) as VehicleInfo & DriverInfo}
					// validationSchema={validationSchema}
					onSubmit={(registrationDetails) => {
						setRegistrationDetails({ registrationDetails });
					}}
				>
					{(formik: FormikProps<VehicleInfo & DriverInfo>) => (
						<>
								<Box
									style={tailwind('w-11/12 items-center ml-4 my-10')}
									shadow={3}
									_light={{ backgroundColor: 'gray.50' }}
									_dark={{ backgroundColor: 'gray.50' }}
								>
									<View style={tailwind('w-11/12 flex-row my-5')}>
										<View style={tailwind('w-1/2 m-0')}>
											<FMSelectInput
												icon='car-cog'
												formik={formik as unknown as FormikProps<FormikValues>}
												name='vehicleType'
												options={[...VEHICLE_TYPE_OPTIONS]}
												placeholder='Vehicle Type'
											/>
											<FMTextInput
												label='Model'
												formik={formik as unknown as FormikProps<FormikValues>}
												name='carModel'
											/>
											<FMTextInput
												label='Color'
												formik={formik as unknown as FormikProps<FormikValues>}
												name='color'
											/>
										</View>
										<View style={tailwind('-ml-20 w-5/12')}>
											<FMImageUploadDisplay callback={openCamera} label='Photo of car'
																						styleProp='w-full'
																						iconPlacement={<FontAwesome5 name='car-alt' size={24} color='black' />} />
										</View>
									</View>
									<View style={tailwind('w-full items-center mb-4')}>
										<FMTextInput
										label='BP-A-1234'
										formik={formik as unknown as FormikProps<FormikValues>}
										name='numberPlate'
									/>
										<FMTextInput
											label='Blue Book number'
											formik={formik as unknown as FormikProps<FormikValues>}
											name='blueBookNumber'
										/>
										<FMTextInput
											label='License Number'
											formik={formik as unknown as FormikProps<FormikValues>}
											name='licenseNumber'
										/></View>
								</Box>
							<Box
								style={tailwind('w-11/12 items-center ml-4 my-5')}
								shadow={3}
								_light={{ backgroundColor: 'gray.50' }}
								_dark={{ backgroundColor: 'gray.50' }}
							>
								<View style={tailwind('w-11/12 flex-row my-5')}>
									<View style={tailwind('w-1/2 m-0')}>
										<FMTextInput
										label='Driver Name'
										formik={formik as unknown as FormikProps<FormikValues>}
										name='driverName'
									/>
										<FMTextInput
											label='Age'
											formik={formik as unknown as FormikProps<FormikValues>}
											name='age'
										/>
										<FMTextInput
											label='Contact Number'
											formik={formik as unknown as FormikProps<FormikValues>}
											name='contactNumber'
										/>
									</View>
									<View style={tailwind('-ml-20 w-5/12')}>
										<FMImageUploadDisplay callback={openDriverCamera} label='Photo of Driver'
																					styleProp='w-full'
																					iconPlacement={<Ionicons name="person" size={24} color="black" />} />
									</View>
								</View>
							</Box>
							<Button
								style={tailwind('flex-auto ml-1')}
								onPress={formik.handleSubmit}
							>
								Register
							</Button>
						</>
					)}
				</Formik>
			</ScrollView>
    </>
  );
};
export default VehicleForm;
