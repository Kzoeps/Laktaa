import React, { FC, useContext, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Box, Text, View, Icon, Image } from 'native-base';
import tailwind from 'tailwind-rn';
import { Formik, FormikProps, FormikValues } from 'formik';
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from '@expo/vector-icons';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import Layout from '../../shared/layout/dashboard';
import {
  POST_JOB_SCHEMA,
  POST_JOB_LOAD_TYPE,
  POST_JOB_INITIALIZER,
  POST_JOB_PERISH,
} from './models/constants';
import { PostJobInfo } from './models/models';
import FMTextInput from '../../shared/components/TextInput';
import FMSelectInput from '../../shared/components/SelectInput/FMSelectInput';
import { DZONGKHAG_GEWOG } from '../../shared/models/constants';
import { AuthContext } from '../auth/auth';
import OpenCamera from './Camera';

const PostJob: FC = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [showCamera, setShowCamera] = useState(false);
  const validationSchema = POST_JOB_SCHEMA;
  const initialValues = POST_JOB_INITIALIZER;
  const [imageUri, setImageUri] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageTaken, setImageTaken] = useState(false);

  const closeCamera = () => {
    setShowCamera(false);
  };

  const saveImage = (
    uri: React.SetStateAction<string>,
    base64: React.SetStateAction<string>
  ) => {
    setImageUri(uri);
    setImageBase64(base64);
    setImageTaken(true);
    console.log(`---> ${uri}`);
  };
  const postJobs = (values: PostJobInfo) => {
    console.log(`values: ${values}`);
  };

  return (
    <>
      <View>
        {showCamera ? (
          <View>
            <OpenCamera closeCamera={closeCamera} updateImageInfo={saveImage} />
          </View>
        ) : undefined}
      </View>
      <ScrollView>
        <View style={tailwind('-mb-20')}>
          <Pageheader navigation page="Post Job" />
        </View>

        <Layout>
          <>
            {/* <OpenCamera /> */}
            <View style={tailwind('mt-6')}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => postJobs(values)}
              >
                {(formik: FormikProps<PostJobInfo>) => (
                  <>
                    {!imageTaken && (
                      <>
                        <TouchableOpacity
                          onPress={() => setShowCamera(true)}
                          style={[
                            tailwind('mx-24 py-16 mb-4'),
                            {
                              borderStyle: 'dashed',
                              borderRadius: 1,
                              borderWidth: 1,
                            },
                          ]}
                        >
                          <Text style={tailwind('text-center')}>
                            Take a picture!
                          </Text>
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
                        {/* <TouchableOpacity
                          style={tailwind(
                            'mb-8 mx-20 border-b border-gray-200'
                          )}
                        >
                          <Text style={tailwind('text-center')}>
                            Upload A Pciture
                          </Text>
                        </TouchableOpacity> */}
                      </>
                    )}
                    {imageTaken && (
                      <>
                        <View style={tailwind('mx-8 h-96')}>
                          <Image
                            source={{
                              uri: imageUri,
                            }}
                            alt="image taken"
                            style={tailwind('h-full')}
                          />
                        </View>
                        <View style={tailwind('my-8')}>
                          <TouchableOpacity onPress={() => setShowCamera(true)}>
                            <Text style={tailwind('text-center text-blue-300')}>
                              Retake Picture!
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                    <Box style={tailwind('mx-8 my-2')}>
                      <FMSelectInput
                        formik={formik as unknown as FormikProps<FormikValues>}
                        name="loadType"
                        options={POST_JOB_LOAD_TYPE}
                        placeholder="Load Type"
                        icon="luggage"
                        inputColor="grey"
                      />
                    </Box>
                    <Box style={tailwind('mx-8 my-2')}>
                      <FMSelectInput
                        formik={formik as unknown as FormikProps<FormikValues>}
                        name="perish"
                        options={POST_JOB_PERISH}
                        placeholder="Perishable/Non-Perishable"
                        icon="food"
                        inputColor="grey"
                        iconPlacement={
                          <MaterialCommunityIcons
                            name="fruit-cherries"
                            size={24}
                            color="black"
                          />
                        }
                      />
                    </Box>
                    <Box style={tailwind('my-2 ml-8')}>
                      <FMTextInput
                        label="Price"
                        name="price"
                        formik={formik as unknown as FormikProps<FormikValues>}
                        icon="money"
                        inputColor="grey"
                        iconPlacement={<FontAwesome name="money" />}
                        variant="outline"
                      />
                    </Box>
                    <Box style={tailwind('my-2 ml-8')}>
                      <FMTextInput
                        label="Weight in KG"
                        name="weight"
                        formik={formik as unknown as FormikProps<FormikValues>}
                        icon="fitness-center"
                        inputColor="grey"
                        iconPlacement={
                          <MaterialCommunityIcons name="weight-kilogram" />
                        }
                        variant="outline"
                      />
                    </Box>

                    <View style={tailwind('items-center justify-center mt-6 ')}>
                      <Text style={tailwind('text-gray-400')}>
                        All the mesurements in meters
                      </Text>
                    </View>
                    <View style={tailwind('flex flex-row mt-4 justify-center')}>
                      <Box style={tailwind('w-28 my-2')}>
                        <FMTextInput
                          label="Height"
                          name="height"
                          formik={
                            formik as unknown as FormikProps<FormikValues>
                          }
                          variant="outline"
                        />
                      </Box>
                      <Box style={tailwind('mx-2 w-28 my-2')}>
                        <FMTextInput
                          label="Length"
                          name="length"
                          formik={
                            formik as unknown as FormikProps<FormikValues>
                          }
                          variant="outline"
                        />
                      </Box>
                      <Box style={tailwind('mx-2 w-28 my-2')}>
                        <FMTextInput
                          label="Breath"
                          name="breath"
                          formik={
                            formik as unknown as FormikProps<FormikValues>
                          }
                          variant="outline"
                        />
                      </Box>
                    </View>
                    <View
                      style={tailwind('mt-8 items-center text-sm mx-6 pb-2')}
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
                        <Box style={tailwind('my-2 ml-8')}>
                          <FMTextInput
                            label="Place"
                            name="pickPlace"
                            variant="outline"
                            formik={
                              formik as unknown as FormikProps<FormikValues>
                            }
                          />
                        </Box>
                        <Box style={tailwind('mx-8 my-2')}>
                          <FMSelectInput
                            formik={
                              formik as unknown as FormikProps<FormikValues>
                            }
                            name="pickDzongkhag"
                            options={DZONGKHAG_GEWOG.dzongkhag}
                            placeholder="Dzongkhag"
                          />
                        </Box>
                        <Box style={tailwind('mx-8 my-2')}>
                          <FMSelectInput
                            formik={
                              formik as unknown as FormikProps<FormikValues>
                            }
                            name="pickDzongkhag"
                            options={
                              DZONGKHAG_GEWOG[formik.values.pickDzongkhag]
                            }
                            placeholder="Gewog"
                          />
                        </Box>
                      </View>
                    </View>
                    <View style={tailwind('border m-4 border-gray-200 ')}>
                      <Text
                        style={tailwind(
                          'mx-6 mt-4 border-b border-gray-200 text-lg'
                        )}
                      >
                        Drop Off
                      </Text>
                      <View>
                        <Box style={tailwind('my-2 ml-8')}>
                          <FMTextInput
                            label="Place"
                            name="dropPlace"
                            variant="outline"
                            formik={
                              formik as unknown as FormikProps<FormikValues>
                            }
                          />
                        </Box>
                        <Box style={tailwind('mx-8 my-2')}>
                          <FMSelectInput
                            formik={
                              formik as unknown as FormikProps<FormikValues>
                            }
                            name="dropDzongkhag"
                            options={DZONGKHAG_GEWOG.dzongkhag}
                            placeholder="Dzongkhag"
                          />
                        </Box>

                        <Box style={tailwind('mx-8 my-2')}>
                          <FMSelectInput
                            formik={
                              formik as unknown as FormikProps<FormikValues>
                            }
                            name="dropGewog"
                            options={
                              DZONGKHAG_GEWOG[formik.values.dropDzongkhag]
                            }
                            placeholder="Gewog"
                          />
                        </Box>
                      </View>
                    </View>

                    <View>
                      <Box style={tailwind('my-2 w-full ml-5')}>
                        <FMTextInput
                          label="Remark/Instruction"
                          name="remarks"
                          variant="outline"
                          formik={
                            formik as unknown as FormikProps<FormikValues>
                          }
                        />
                      </Box>
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
          </>
        </Layout>
      </ScrollView>
    </>
  );
};

export default PostJob;
