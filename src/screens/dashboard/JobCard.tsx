import React, { FC } from 'react';
import { Image } from 'react-native';
import { Text, View } from 'native-base';
import tailwind from 'tailwind-rn';

const JobCard: FC = () => {
  const data = [
    {
      from_place: 'Thimphu',
      to_place: 'Bumthang',
      price: 100.0,
      pieces: 3,
      weight: '10kg',
      id: 1,
      phone: '17949642',
      name: 'Phuntsho Norbu',
      image: 'https://phuntshonorbu.com/images/gallery/Lungchutse/IMG_6846.jpg',
    },
    {
      from_place: 'P/gathsel',
      to_place: 'Bumthang',
      price: 4300.0,
      pieces: 8,
      weight: '50kg',
      id: 2,
      phone: '17942422',
      name: 'Sangay Chezom',
      image: 'https://phuntshonorbu.com/images/gallery/Nepal/IMG_6460.jpg',
    },
    {
      id: 3,
      from_place: 'Thimphu',
      to_place: 'Mongar',
      price: 1000.0,
      pieces: 12,
      weight: '23kg',
      phone: '77889966',
      name: 'Pema Dorji',
      image: 'https://phuntshonorbu.com/images/gallery/Nepal/IMG_6272.jpg',
    },
    {
      id: 4,
      from_place: 'Lhuntse',
      to_place: 'S/Jongkhar',
      price: 789.0,
      pieces: 6,
      weight: '32kg',
      phone: '17981235',
      name: 'Sonam Zangmo',
      image: 'https://phuntshonorbu.com/images/gallery/Nepal/IMG_6561-2.jpg',
    },
    {
      id: 5,
      from_place: 'Mongar',
      to_place: 'Zhemgang',
      price: 1235.0,
      pieces: 3,
      weight: '10kg',
      phone: '17949642',
      name: 'Phuntsho Norbu',
      image: 'https://phuntshonorbu.com/images/gallery/Nepal/IMG_6189.jpg',
    },
    {
      id: 6,
      from_place: 'Thimphu',
      to_place: 'Phuntsholing',
      price: 3465.0,
      pieces: 3,
      weight: '7kg',
      phone: '17171712',
      name: 'Kuenzang Wangmo',
      image: 'https://phuntshonorbu.com/images/gallery/Lungchutse/IMG_6846.jpg',
    },
    {
      id: 7,
      from_place: 'Paro',
      to_place: 'Haa',
      price: 550.0,
      pieces: 1,
      weight: '10kg',
      phone: '17892317',
      name: 'Dorji Gyeltshen',
      image: 'https://phuntshonorbu.com/images/gallery/Lungchutse/IMG_6846.jpg',
    },
  ];
  return (
    <>
      {data.map((item, index) => (
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
          key={item.from_place + item.to_place + item.price + item.pieces}
        >
          <Image
            style={tailwind('w-24 rounded-l-2xl')}
            source={{ uri: item.image }}
          />

          <View style={tailwind('flex-1 px-2 pt-4')}>
            <View style={tailwind('mb-3')}>
              <View style={tailwind('flex flex-row')}>
                <View style={tailwind('flex-1 border-r border-gray-200')}>
                  <Text style={tailwind('text-center')}>{item.from_place}</Text>
                  <Text style={tailwind('text-center')}>to</Text>
                  <Text style={tailwind('text-center')}>{item.to_place}</Text>
                </View>
                <View style={tailwind('flex-1 border-r border-gray-200')}>
                  <Text style={tailwind('text-center')}>Price</Text>
                  <Text style={tailwind('text-center')}>Nu {item.price}</Text>
                </View>
                <View style={tailwind('flex-1 border-gray-200')}>
                  <Text style={tailwind('text-center')}>
                    Nos: {item.pieces}
                  </Text>
                  <Text style={tailwind('text-center')}>{item.weight}</Text>
                </View>
              </View>
            </View>

            <View style={tailwind('flex-row border-t border-gray-100 py-2')}>
              <View style={tailwind('flex-1')}>
                <Text style={tailwind('text-center')}>Call</Text>
              </View>
              <View style={tailwind('flex-1')}>
                <Text style={tailwind('text-center')}>Detail</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default JobCard;
