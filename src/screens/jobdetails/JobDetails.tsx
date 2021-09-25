import React from 'react';
import { Image, ScrollView } from 'react-native';
import { View, Text, Box } from 'native-base';
import tailwind from 'tailwind-rn';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import Layout from '../../shared/layout/layout';

const JobDetails = ({ route, naviagtion }) => {
  const { imageUrl, jobcardId } = route.params;

  const styles = {
    measurementParent: 'border-b border-gray-200 pb-1',
    measurementLabel: 'text-gray-300',
    numberPrice: 'border-b border-gray-200 pb-1 mr-16',
    location: 'mx-8 my-1 p-2 border-b border-gray-200',
  };
  // console.log(`job card id : ${imageUrl}`);

  return (
    <>
      <ScrollView>
        <View style={tailwind('-mb-20')}>
          <Pageheader navigation page="Job Details" />
        </View>
        <Image
          style={tailwind('w-full h-60 mt-12 absolute top-14')}
          source={{ uri: imageUrl }}
        />
        {/* <View style={tailwind('mt-60')}></View> */}
        <View style={tailwind('mx-10 mt-72')}>
          <View style={tailwind('flex-row justify-between mt-8 pb-8 ')}>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>Weight</Text>
              <Text>50kg</Text>
            </View>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>Height</Text>
              <Text>40m</Text>
            </View>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>Length</Text>
              <Text>30m</Text>
            </View>
          </View>

          <View style={tailwind('flex-row justify-start')}>
            <View style={tailwind(styles.numberPrice)}>
              <Text style={tailwind(styles.measurementLabel)}>Number</Text>
              <Text>4</Text>
            </View>
            <View style={tailwind(styles.numberPrice)}>
              <Text style={tailwind(styles.measurementLabel)}>
                Total Price (Nu)
              </Text>
              <Text>300</Text>
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
                  <Text>Sonam Tshonkhag </Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>17949642</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>Dekyil Guest House</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>Bumthang</Text>
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
                  <Text>Penjorla </Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>17554152</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>Zinthar Tshongkhang</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text>Thimphu</Text>
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
