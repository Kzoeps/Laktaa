import React, { FC, useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import tailwind from 'tailwind-rn';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import call from 'react-native-phone-call';
import { AuthContext } from '../auth/auth';
import { FIREBASE_TRACK_USER } from './utils/API';

const JobCard: FC = ({ data, navigation }) => {
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
    console.log('hello world');
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
                  recordCall(item.id, item.poster);
                  call({ number: item.pickUpPhone, prompt: true });
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
                  navigation.navigate('JobDetails', {
                    data: item,
                    imageUrl: item.image,
                  })
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
