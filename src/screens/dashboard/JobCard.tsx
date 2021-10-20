import React, { FC, useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View, useToast } from 'native-base';
import tailwind from 'tailwind-rn';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import call from 'react-native-phone-call';
import { AuthContext } from '../auth/auth';
import { FIREBASE_TRACK_USER } from './utils/API';

const JobCard: FC = ({ data, navigation, registeredDriver }) => {
  const toast = useToast();
  const { currentUser } = useContext(AuthContext);
  const values = { poster: '', docId: '', currentUser: '' };
  const recordCall = async (docId: string, poster: string) => {
    if (poster === currentUser.email) {
      return;
    }
    values.poster = poster;
    values.docId = docId;
    values.currentUser = currentUser.email;
    await FIREBASE_TRACK_USER.trackUser(values);
  };

  const showRegiterAsDriverError = () => {
    toast.show({
      title: 'You need to be registered as a driver first!',
      status: 'error',
    });
  };

  const pressCall = (id: string, poster: string, phoneNumber: number) => {
    if (registeredDriver === true) {
      recordCall(id, poster);
      call({ number: phoneNumber, prompt: true });
    } else {
      showRegiterAsDriverError();
    }
  };

  const navigateToJobDetails = (page: string, data, imageUrl: string) => {
    if (registeredDriver === true) {
      navigation.navigate(page, {
        data,
        imageUrl,
      });
    } else {
      showRegiterAsDriverError();
    }
  };

  return (
    <>
      {data.map((item) => (
        <View
          style={[
            tailwind('bg-white m-2 flex flex-row rounded-2xl'),
            {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2.62,
              elevation: 4,
            },
          ]}
          key={item.id}
        >
          <Image
            style={tailwind('w-24 rounded-l-2xl')}
            source={{ uri: item.imageUri }}
          />

          <View style={tailwind('flex-1 px-2 pt-4')}>
            <View style={tailwind('mb-3')}>
              <View style={tailwind('flex flex-row')}>
                <View style={tailwind('flex-1 border-r border-gray-200')}>
                  <Text style={tailwind('text-center')}>
                    {item.pickDzongkhag}
                  </Text>
                  <Text style={tailwind('text-center')}>to</Text>
                  <Text style={tailwind('text-center')}>
                    {item.dropDzongkhag}
                  </Text>
                </View>
                <View style={tailwind('flex-1 border-r border-gray-200')}>
                  <Text style={tailwind('text-center')}>Price</Text>
                  <Text style={tailwind('text-center')}>Nu {item.price}</Text>
                </View>
                <View style={tailwind('flex-1 border-gray-200')}>
                  <Text style={tailwind('text-center')}>
                    Nos: {item.pieces}
                  </Text>
                  <Text style={tailwind('text-center')}>Kg:{item.weight}</Text>
                </View>
              </View>
            </View>

            <View
              style={tailwind(
                'flex-row border-t border-gray-100 py-2 justify-center'
              )}
            >
              <TouchableOpacity
                style={tailwind('flex-1 mx-2 w-full')}
                onPress={() => {
                  pressCall(item.id, item.poster, item.pickUpPhone);
                }}
              >
                <Text
                  style={tailwind(
                    'text-center border-gray-200 border rounded-3xl py-1 px-6'
                  )}
                >
                  <Feather name="phone-call" size={16} color="#33d399" />
                  &nbsp;&nbsp;Call
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tailwind('flex-1 w-full px-2')}
                onPress={() =>
                  navigateToJobDetails('JobDetails', item, item.image)
                }
              >
                <Text
                  style={tailwind(
                    'text-center border-gray-200 border rounded-3xl py-1 px-6'
                  )}
                >
                  <MaterialCommunityIcons
                    name="page-next-outline"
                    size={16}
                    color="#33d399"
                  />
                  &nbsp;&nbsp;Detail
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default JobCard;
