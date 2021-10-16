import React, { FC } from 'react';
import { Image, ScrollView } from 'react-native';
import { View, Text, Box } from 'native-base';
import tailwind from 'tailwind-rn';
import Pageheader from '../../shared/components/Pageheader/Pageheader';
import Layout from '../../shared/layout/layout';
import { NavigationProps, RoutePaths } from '../../shared/models/model';

type JobDetailsNavProps = NavigationProps<RoutePaths.jobDetails>;
const JobDetails: FC<JobDetailsNavProps> = ({ route, navigation }) => {
  const { imageUrl, data } = route.params;

  const styles = {
    measurementParent: 'border-b border-gray-200 pb-1',
    measurementLabel: 'text-gray-300',
    numberPrice: 'border-b border-gray-200 pb-1 mr-16',
    location: 'mx-8 my-1 p-2 border-b border-gray-200',
    infoLabel: 'text-gray-300 text-sm',
  };

  const returnDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return [day, month, date.getFullYear()].join('-');
  };
  return (
    <>
      <ScrollView>
        <View style={tailwind('-mb-20')}>
          <Pageheader navigation page="Job Details" />
        </View>
        <Image
          style={tailwind('w-full h-80 mt-12 absolute top-14')}
          source={{ uri: data.imageUri }}
        />
        {/* <View style={tailwind('mt-60')}></View> */}
        <View style={tailwind('mx-10 mt-96')}>
          <View style={tailwind('flex-row justify-between pb-8 mt-8')}>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>Pieces</Text>
              <Text>{data.pieces}</Text>
            </View>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>
                Total Weight (Kg)
              </Text>
              <Text>{data.weight}</Text>
            </View>
          </View>

          <View style={tailwind('flex-row justify-between pb-8 ')}>
            <View style={tailwind(styles.measurementParent)}>
              <Text style={tailwind(styles.measurementLabel)}>Size</Text>
              <Text>{data.size}</Text>
            </View>
            <View style={tailwind(styles.measurementParent)}>
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
                  <Text style={tailwind(styles.infoLabel)}>Landmark</Text>
                  <Text>{data.pickPlace}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text style={tailwind(styles.infoLabel)}>Gewog</Text>
                  <Text>{data.pickGewog}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text style={tailwind(styles.infoLabel)}>Dzongkhag</Text>
                  <Text>{data.pickDzongkhag}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text style={tailwind(styles.infoLabel)}>Date</Text>
                  <Text>{returnDate(data.pickUpDate)}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text style={tailwind(styles.infoLabel)}>Phone</Text>
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
                  <Text style={tailwind(styles.infoLabel)}>Landmark</Text>
                  <Text>{data.dropPlace} </Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text style={tailwind(styles.infoLabel)}>Gewog</Text>
                  <Text>{data.dropGewog}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text style={tailwind(styles.infoLabel)}>Dzongkhag</Text>
                  <Text>{data.dropDzongkhag}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text style={tailwind(styles.infoLabel)}>Date</Text>
                  <Text>{returnDate(data.dropOffDate)}</Text>
                </Box>
              </View>
              <View>
                <Box style={tailwind(styles.location)}>
                  <Text style={tailwind(styles.infoLabel)}>Phone</Text>
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
