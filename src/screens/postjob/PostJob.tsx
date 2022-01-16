import React, { FC, useContext, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import {
  Box,
  Text,
  View,
  Icon,
  Image,
  useToast,
  Spinner,
  Heading,
} from 'native-base';
import tailwind from 'tailwind-rn';
import { Formik, FormikProps, FormikValues } from 'formik';
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import Layout from '../../shared/layout/layout';
import {
  POST_JOB_SCHEMA,
  POST_JOB_LOAD_TYPE,
  POST_JOB_INITIALIZER,
  POST_JOB_PERISH,
  POST_JOB_SIZES,
} from './models/constants';
import FMTextInput from '../../shared/components/TextInput';
import FMSelectInput from '../../shared/components/SelectInput/FMSelectInput';
import { DZONGKHAG_GEWOG } from '../../shared/models/constants';
import { AuthContext } from '../auth/auth';
import OpenCamera from './Camera';
import { FIREBASE_POSTJOB_CALLS } from './utils/API';
import Calendar from '../../shared/components/Calendar/calendar';
import {
  NavigationProps,
  RoutePaths,
  PostJobInfo,
} from '../../shared/models/model';

type PostJobNavProps = NavigationProps<RoutePaths.postJob>;
const PostJob: FC<PostJobNavProps> = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [showCamera, setShowCamera] = useState(false);
  const validationSchema = POST_JOB_SCHEMA;
  const initialValues = POST_JOB_INITIALIZER;
  const [imageUri, setImageUri] = useState('');
  const [imageTaken, setImageTaken] = useState(false);
  const [imageRequired, setImageRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const changeFromDate = (value: Date) => {
    setFromDate(value);
  };
  const changeToDate = (value: Date) => {
    setToDate(value);
  };

  const toast = useToast();
  const closeCamera = () => {
    setShowCamera(false);
  };

  const saveImage = (uri: string) => {
    setImageUri(uri);
    setImageTaken(true);
  };
  const postJobs = async (values: PostJobInfo, { resetForm }) => {
    if (!imageTaken) {
      setImageRequired(true);
      return;
    }
    if (fromDate > toDate) {
      toast.show({
        title: 'Pick up date cannot be after the drop off \n date',
        status: 'error',
      });
      return;
    }
    setLoading(true);
    const uploadedImage = await FIREBASE_POSTJOB_CALLS.postImage(imageUri);
    // eslint-disable-next-line no-param-reassign
    values.poster = currentUser.phoneNumber;
    // eslint-disable-next-line no-param-reassign
    values.imageUri = uploadedImage;
    // eslint-disable-next-line no-param-reassign
    values.pickUpDate = fromDate;
    // eslint-disable-next-line no-param-reassign
    values.dropOffDate = toDate;
    // eslint-disable-next-line no-param-reassign
    values.called = [];

    await FIREBASE_POSTJOB_CALLS.postJob(values);
    toast.show({ title: 'Job successfully posted!', status: 'success' });
    setLoading(false);
    resetForm();
    setImageTaken(false);
    setImageUri('');
  };
  if (loading)
    return (
      <>
        <View style={tailwind('my-24')}>
          <Spinner
            accessibilityLabel="Loading posts"
            color="emerald.500"
            size="lg"
          />
          <Heading
            style={tailwind('text-center')}
            color="emerald.500"
            fontSize="xl"
          >
            Posting Jobs...
          </Heading>
        </View>
      </>
    );
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
                onSubmit={postJobs}
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
                        {imageRequired ? (
                          <Text style={tailwind('text-red-500 text-center')}>
                            Image Required
                          </Text>
                        ) : undefined}
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
                        iconPlacement={
                          <MaterialIcons
                            name="luggage"
                            size={24}
                            color="black"
                          />
                        }
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
                        label="Delivery Fee"
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
                    <Box style={tailwind('my-2 ml-8')}>
                      <FMTextInput
                        label="Pieces"
                        name="pieces"
                        formik={formik as unknown as FormikProps<FormikValues>}
                        icon="cubes"
                        inputColor="grey"
                        iconPlacement={<FontAwesome5 name="cubes" />}
                        variant="outline"
                      />
                    </Box>
                    <Box style={tailwind('mx-8 my-2')}>
                      <FMSelectInput
                        formik={formik as unknown as FormikProps<FormikValues>}
                        name="size"
                        options={POST_JOB_SIZES}
                        placeholder="Size"
                        icon="size"
                        iconPlacement={
                          <Entypo
                            name="resize-full-screen"
                            size={24}
                            color="black"
                          />
                        }
                        inputColor="grey"
                      />
                    </Box>

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
                            label="Address/Landmark nearby"
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
                            name="pickGewog"
                            options={
                              DZONGKHAG_GEWOG[formik.values.pickDzongkhag]
                            }
                            placeholder="Gewog"
                          />
                        </Box>
                        <Box style={tailwind('my-2 ml-8')}>
                          <FMTextInput
                            label="Contact number of parcel owner"
                            name="pickUpPhone"
                            variant="outline"
                            formik={
                              formik as unknown as FormikProps<FormikValues>
                            }
                          />
                        </Box>
                        <Box
                          style={tailwind(
                            'p-4 mx-8 my-2 ml-8 border rounded border-gray-300'
                          )}
                        >
                          <View>
                            <Calendar
                              value=""
                              setDate={changeFromDate}
                              placeholder="Pick up"
                            />
                          </View>
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
                            label="Address/Landmark nearby"
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
                        <Box style={tailwind('my-2 ml-8')}>
                          <FMTextInput
                            label="Contact number of goods receiver"
                            name="dropOffPhone"
                            variant="outline"
                            formik={
                              formik as unknown as FormikProps<FormikValues>
                            }
                          />
                        </Box>
                        <Box
                          style={tailwind(
                            'p-4 mx-8 my-2 ml-8 border rounded border-gray-300'
                          )}
                        >
                          <View>
                            <Calendar
                              value=""
                              setDate={changeToDate}
                              placeholder="Drop off"
                            />
                          </View>
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
                      onPress={formik.handleSubmit}
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
