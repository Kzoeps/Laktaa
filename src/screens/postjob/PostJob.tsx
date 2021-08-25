import React, { FC, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Box, Text, View, Icon } from 'native-base';
import tailwind from 'tailwind-rn';
import { Formik, FormikProps, FormikValues } from 'formik';
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from '@expo/vector-icons';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import Layout from '../../shared/layout/dashboard';
import POST_JOB_SCHEMA from './models/constants';
import FMTextInput from '../../shared/components/TextInput';
import SelectInput from '../../shared/components/SelectInput';
import { DZONGKHAG_GEWOG } from '../../shared/models/constants';

import OpenCamera from './Camera';

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
                  <TouchableOpacity
                    style={[
                      tailwind('mx-24 py-16 mb-8'),
                      {
                        borderStyle: 'dashed',
                        borderRadius: 1,
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <Text style={tailwind('text-center')}>Take a picture!</Text>
                    <Text style={tailwind('text-center mt-4')}>
                      <Icon
                        as={<Entypo name="camera" />}
                        size="md"
                        _light={{
                          color: 'grey',
                        }}
                      />
                    </Text>
                  </TouchableOpacity>

                  <Box style={tailwind('mx-8')}>
                    {/* icon, selectedValue, setValue, options */}
                    <SelectInput
                      icon="luggage"
                      selectedValue={loadType}
                      setValue={setLoad}
                      options={loadOptions}
                      placeHolderValue="Load Type"
                      width="98%"
                    />
                  </Box>
                  <Box style={tailwind('mx-8')}>
                    <SelectInput
                      icon="food-variant"
                      selectedValue={perish}
                      setValue={setPerishable}
                      options={perishOptions}
                      placeHolderValue="Perishable / Not"
                      iconPlacement={
                        <MaterialCommunityIcons name="food-variant" />
                      }
                    />
                  </Box>
                  <Box style={tailwind('mx-8')}>
                    <FMTextInput
                      label="Price"
                      name="price"
                      formik={formik as unknown as FormikProps<FormikValues>}
                      icon="money"
                      inputColor="grey"
                      iconPlacement={<FontAwesome name="money" />}
                    />
                  </Box>
                  <Box style={tailwind('mx-8 my-2')}>
                    <FMTextInput
                      label="Weight in KG"
                      name="weight"
                      formik={formik as unknown as FormikProps<FormikValues>}
                      icon="fitness-center"
                      inputColor="grey"
                      iconPlacement={
                        <MaterialCommunityIcons name="weight-kilogram" />
                      }
                    />
                  </Box>

                  <View
                    style={tailwind('items-center justify-center w-full mt-6 ')}
                  >
                    <Text style={tailwind('text-gray-400')}>
                      All the mesurements in meters
                    </Text>
                  </View>
                  <View
                    style={tailwind(
                      'flex flex-row mt-4 items-center justify-center w-full'
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
                  <View style={tailwind('mt-8 items-center text-sm mx-6 pb-2')}>
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
                      <Box style={tailwind('mx-8')}>
                        <FMTextInput
                          label="Place"
                          name="pickPlace"
                          formik={
                            formik as unknown as FormikProps<FormikValues>
                          }
                        />
                      </Box>
                      <Box style={tailwind('mx-8 w-11/12')}>
                        <SelectInput
                          selectedValue={pickDzongkhag}
                          setValue={setDzongkhagPick}
                          options={DZONGKHAG_GEWOG.dzongkhag}
                          placeHolderValue="Dzongkhag"
                        />
                      </Box>
                      {pickDzongkhag ? (
                        <Box style={tailwind('mx-8 w-11/12')}>
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
                      <Box style={tailwind('mx-8 w-10/12 ')}>
                        <FMTextInput
                          label="Place"
                          name="dropPlace"
                          formik={
                            formik as unknown as FormikProps<FormikValues>
                          }
                        />
                      </Box>
                      <Box style={tailwind('mx-8 w-11/12')}>
                        <SelectInput
                          selectedValue={dropDzongkhag}
                          setValue={setDzongkhagDrop}
                          options={DZONGKHAG_GEWOG.dzongkhag}
                          placeHolderValue="Dzongkhag"
                        />
                      </Box>
                      {dropDzongkhag ? (
                        <Box style={tailwind('mx-8 w-11/12')}>
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
                  <TouchableOpacity
                    style={tailwind('bg-green-400 mx-4 my-6 rounded-md')}
                  >
                    <Text
                      style={tailwind('text-white my-4 text-xl text-center')}
                    >
                      Post
                    </Text>
                  </TouchableOpacity>
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
