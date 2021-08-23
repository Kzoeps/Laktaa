import React, { FC, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Box, Text, View, Icon } from 'native-base';
import tailwind from 'tailwind-rn';
import { Formik, FormikProps, FormikValues } from 'formik';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import Layout from '../../shared/layout/dashboard';
import POST_JOB_SCHEMA from './models/constants';
import FMTextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import { DZONGKHAG_GEWOG } from '../../shared/models/constants';
// import { StringSchema } from 'yup';

const PostJob: FC = ({ navigation }) => {
  const [loadType, setLoadType] = useState('');
  const [perish, setPerish] = useState('');
  const [pickDzongkhag, setPickDzongkhag] = useState('');
  const [pickGewog, setPickGewog] = useState('');
  const [dropDzongkhag, setDropDzongkhag] = useState('');
  const [dropGewog, setDropGewog] = useState('');
  const loadOptions = [{ name: 'Big' }, { name: 'Small' }];
  const perishOptions = [{ name: 'Perishibale' }, { name: 'Non-perishable' }];

  const setLoad = (value: string) => {
    setLoadType(value);
  };
  const setPerishable = (value: string) => {
    setPerish(value);
  };
  const setDzongkhagPick = (value: string) => {
    setPickDzongkhag(value);
  };
  const setGewogPick = (value: string) => {
    setPickGewog(value);
  };
  const setDzongkhagDrop = (value: string) => {
    setDropDzongkhag(value);
  };
  const setGewogDrop = (value: string) => {
    setDropGewog(value);
  };

  const validationSchema = POST_JOB_SCHEMA;
  const initialValues = {
    price: '',
    weight: '',
    height: '',
    length: '',
    breath: '',
    pickPlace: '',
    pickInstruction: '',
    dropPlace: '',
    dropInstruction: '',
    remarks: '',
  };

  const postJobs = (values) => {
    console.log(`values: ${values}`);
  };

  return (
    <>
      <ScrollView>
        <View style={tailwind('-mb-20')}>
          <Pageheader navigation page="Post Job" />
        </View>
        <Layout>
          <View style={tailwind('mt-6')}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => postJobs(values)}
            >
              {(
                formik: FormikProps<{
                  price: string;
                  weight: number;
                  height: number;
                  length: number;
                  breath: number;
                  pickPlace: string;
                  pickInstruction: string;
                  dropPlace: string;
                  dropInstruction: string;
                  remarks: string;
                }>
              ) => (
                <>
                  <Box style={tailwind('mx-3')}>
                    {/* icon, selectedValue, setValue, options */}
                    <SelectInput
                      icon="luggage"
                      selectedValue={loadType}
                      setValue={setLoad}
                      options={loadOptions}
                      placeHolderValue="Load Type"
                    />
                  </Box>
                  <Box style={tailwind('mx-3')}>
                    <SelectInput
                      icon="timer"
                      selectedValue={perish}
                      setValue={setPerishable}
                      options={perishOptions}
                      placeHolderValue="Perishable / Not"
                    />
                  </Box>
                  <Box style={tailwind('mx-3')}>
                    <FMTextInput
                      label="Price"
                      name="price"
                      formik={formik as unknown as FormikProps<FormikValues>}
                      icon="money"
                      inputColor="grey"
                    />
                  </Box>
                  <Box style={tailwind('mx-3')}>
                    <FMTextInput
                      label="Weight"
                      name="weight"
                      formik={formik as unknown as FormikProps<FormikValues>}
                      icon="fitness-center"
                      inputColor="grey"
                    />
                  </Box>

                  <View
                    style={tailwind(
                      'flex flex-row mt-2 items-center justify-center'
                    )}
                  >
                    <Box style={tailwind('mx-2 w-28')}>
                      <FMTextInput
                        label="Height"
                        name="height"
                        formik={formik as unknown as FormikProps<FormikValues>}
                      />
                    </Box>
                    <Box style={tailwind('mx-2 w-28')}>
                      <FMTextInput
                        label="Length"
                        name="length"
                        formik={formik as unknown as FormikProps<FormikValues>}
                      />
                    </Box>
                    <Box style={tailwind('mx-2 w-28')}>
                      <FMTextInput
                        label="Breath"
                        name="breath"
                        formik={formik as unknown as FormikProps<FormikValues>}
                      />
                    </Box>
                  </View>
                  <View
                    style={tailwind(
                      'mt-8 items-center text-sm border-b mx-6 border-gray-400 pb-2'
                    )}
                  >
                    <Text style={tailwind('mt-8 items-center text-xl ')}>
                      Location Details
                    </Text>
                  </View>
                  <View style={tailwind('border m-4 border-gray-200')}>
                    <Text
                      style={tailwind(
                        'mx-6 mt-4 border-b border-gray-200 text-lg'
                      )}
                    >
                      Pick Up
                    </Text>
                    <View>
                      <Box style={tailwind('mx-8 w-full ')}>
                        <FMTextInput
                          label="Place"
                          name="pickPlace"
                          formik={
                            formik as unknown as FormikProps<FormikValues>
                          }
                        />
                      </Box>
                      <Box style={tailwind('mx-8 w-full')}>
                        <SelectInput
                          selectedValue={pickDzongkhag}
                          setValue={setDzongkhagPick}
                          options={DZONGKHAG_GEWOG.dzongkhag}
                          placeHolderValue="Dzongkhag"
                        />
                      </Box>
                      {pickDzongkhag ? (
                        <Box style={tailwind('mx-8 w-full')}>
                          <SelectInput
                            selectedValue={pickGewog}
                            setValue={setGewogPick}
                            options={DZONGKHAG_GEWOG[pickDzongkhag]}
                            placeHolderValue="Gewog"
                          />
                        </Box>
                      ) : undefined}
                    </View>
                  </View>

                  <View style={tailwind('border m-4 border-gray-200')}>
                    <Text
                      style={tailwind(
                        'mx-6 mt-4 border-b border-gray-200 text-lg'
                      )}
                    >
                      Drop Off
                    </Text>
                    <View>
                      <Box style={tailwind('mx-8 w-full ')}>
                        <FMTextInput
                          label="Place"
                          name="dropPlace"
                          formik={
                            formik as unknown as FormikProps<FormikValues>
                          }
                        />
                      </Box>
                      <Box style={tailwind('mx-8 w-full')}>
                        <SelectInput
                          selectedValue={dropDzongkhag}
                          setValue={setDzongkhagDrop}
                          options={DZONGKHAG_GEWOG.dzongkhag}
                          placeHolderValue="Dzongkhag"
                        />
                      </Box>
                      {dropDzongkhag ? (
                        <Box style={tailwind('mx-8 w-full')}>
                          <SelectInput
                            selectedValue={dropGewog}
                            setValue={setGewogDrop}
                            options={DZONGKHAG_GEWOG[dropDzongkhag]}
                            placeHolderValue="Gewog"
                          />
                        </Box>
                      ) : undefined}
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </Layout>
      </ScrollView>
    </>
  );
};

export default PostJob;
