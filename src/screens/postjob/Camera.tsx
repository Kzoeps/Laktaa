import React, { useState, useEffect, FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import tailwind from 'tailwind-rn';

const OpenCamera: FC = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={tailwind('flex')}>
      <Camera style={tailwind('flex')} type={type}>
        <View style={tailwind('flex-1 flex-row m-20 bg-transparent')}>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={tailwind('text-xs text-white')}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default OpenCamera;
