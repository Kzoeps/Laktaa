import React, { FC, useEffect, useState } from 'react';
import { Box, Button } from 'native-base';
import FMHeader from '../../shared/components/FMHeader/FMHeader';
import Layout from '../../shared/layout/layout';
import VehicleForm from './vehicle-form';
import { DriverInfo, VehicleInfo } from './models/models';

const VehicleRegistration: FC = ({ navigation }) => {
  const [formValues, setFormValues] = useState<DriverInfo & VehicleInfo>();
  const [updateDriverInfo, setUpdateDriverInfo] = useState<boolean>(false);
  useEffect(() => {
    if (updateDriverInfo) {
      console.log(formValues);
      setUpdateDriverInfo(false);
    }
  }, [updateDriverInfo, formValues]);
  return (
    <>
      <Box bg="emerald.400">
        <FMHeader header="Vehicle Registration" />
        <Layout styleProp="h-full">
          <VehicleForm
            setFormValues={setFormValues}
            setUpdateDriverInfo={setUpdateDriverInfo}
          />
          <Button onPress={() => navigation.navigate('User Profile')}>
            ROUTE TO USER
          </Button>
        </Layout>
      </Box>
    </>
  );
};
export default VehicleRegistration;
