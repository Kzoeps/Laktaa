import React from 'react';
import { Image, ScrollView } from 'react-native';
import { View, Text, Box } from 'native-base';
import tailwind from 'tailwind-rn';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import Layout from '../../shared/layout/layout';

const JobDetails = ({ route, naviagtion }) => {
  const { imageUrl, data } = route.params;

  const styles = {
    measurementParent: 'border-b border-gray-200 pb-1',
    measurementLabel: 'text-gray-300',
    numberPrice: 'border-b border-gray-200 pb-1 mr-16',
    location: 'mx-8 my-1 p-2 border-b border-gray-200',
  };
  return (
    <>
      <ScrollView>
        <View style={tailwind('-mb-20')}>
          <Pageheader navigation page="Job Details" />
        </View>
        <Image
          style={tailwind('w-full h-60 mt-12 absolute top-14')}
          source={{ uri: data.imageUri }}
        />
        {/* <View style={tailwind('mt-60')}></View> */}
        <View style={tailwind('mx-10 mt-72')}>
          <View style={tailwind('flex-row justify-between mt-8 pb-8 ')}>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>Weight</Text>
              <Text>{data.weight}</Text>
            </View>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>Height</Text>
              <Text>{data.height}</Text>
            </View>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>Length</Text>
              <Text>{data.length}</Text>
            </View>
          </View>

          <View style={tailwind('flex-row justify-start')}>
            {/* <View style={tailwind(styles.numberPrice)}>
              <Text style={tailwind(styles.measurementLabel)}>Number</Text>
              <Text>4</Text>
            </View> */}
            <View style={tailwind(styles.numberPrice)}>
              <Text style={tailwind(styles.measurementLabel)}>
                Total Price (Nu)
              </Text>
              <Text>{data.price}</Text>
            </View>
          </View>
          <View>
            <Text style={tailwind('mt-8 text-xl ')}>Location Details</Text>
            <View style={tailwind('border my-4 border-gray-200')}>
              <Text
                style={tailwind(
                  'bg-green-300 py-2 px-4 border-b border-gray-200 text-lg text-white'
                )}
              >
                Pick Up
              </Text>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>{data.pickPlace}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>{data.pickGewog}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>{data.pickDzongkhag}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>{data.pickUpPhone}</Text>
                </Box>
              </View>
            </View>

            <View style={tailwind('my-4 border border-gray-200')}>
              <Text
                style={tailwind(
                  'bg-green-300 py-2 px-4 border-b border-gray-200 text-lg text-white'
                )}
              >
                Delivery
              </Text>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>{data.dropPlace} </Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>{data.dropGewog}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>{data.dropDzongkhag}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>{data.dropOffPhone}</Text>
                </Box>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default JobDetails;
