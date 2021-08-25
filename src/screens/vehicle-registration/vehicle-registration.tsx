import React, { FC, useState } from 'react';
import { Box } from 'native-base';
import FMHeader from '../../shared/components/FMHeader/FMHeader';
import Layout from '../../shared/layout/layout';
import VehicleForm from './vehicle-form';

const VehicleRegistration: FC = () => {
	const [something, set] = useState(false);
	return (
		<>
			<Box bg='emerald.400'>
				<FMHeader header='Vehicle Registration' />
				<Layout styleProp='h-full'>
					<VehicleForm />
				</Layout>
			</Box>

		</>
	);
};
export default VehicleRegistration;
