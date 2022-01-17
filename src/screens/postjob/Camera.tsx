import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import { Camera } from 'expo-camera';
import tailwind from 'tailwind-rn';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { GenericFunction } from '../../shared/models/model';

/**
 *
 * @param showMySelf: is used to conditionally render this component.
 * since in most cases the camera is only to be shown when some action happens.
 * @constructor
 */
const OpenCamera: FC<{
  closeCamera?: () => void;
  updateImageInfo: (uri: string) => void;
  showMySelf?: boolean | undefined | null;
  showGalleryOption?: boolean | undefined | null;
  onGalleryClick?: GenericFunction;
}> = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [imageInfo, setImageInfo] = useState();
  const cameraRef = useRef();
  const WINDOW_HEIGHT = Dimensions.get('window').height - 180;
  // eslint-disable-next-line no-multi-assign, no-param-reassign
  const onGalleryClick = (props.onGalleryClick ??= () => undefined);

  const onHandlePermission = useCallback(async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }, []);

  useEffect(() => {
    onHandlePermission();
  }, [onHandlePermission]);

  /* return null to hide component until showMySelf is true */
  if (props.showMySelf === false) return null;
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Permission to use the camera has been Denied</Text>;
  }

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      props.updateImageInfo(data.uri);
      props.closeCamera && props.closeCamera();
    }
  };
  return (
    <View>
      <Camera ref={cameraRef} type={type} style={tailwind('h-full')}>
        <>
          <View style={tailwind('flex-1 flex-row justify-between')}>
            <TouchableOpacity
              style={tailwind('m-4')}
              onPress={() => {
                props?.closeCamera();
              }}
            >
              <Text style={tailwind('pt-4')}>
                <AntDesign name="closecircleo" size={26} color="grey" />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tailwind('mb-8 flex-row justify-between')}>
            {props?.showGalleryOption ? (
              <TouchableOpacity
                onPress={onGalleryClick}
                style={tailwind('p-4')}
              >
                <Text style={tailwind('pt-4')}>
                  <MaterialIcons name="collections" size={32} color="white" />
                </Text>
              </TouchableOpacity>
            ) : undefined}
            <TouchableOpacity onPress={onSnap}>
              <Text style={tailwind('text-center pt-12')}>
                <MaterialIcons name="camera" size={68} color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind('m-4')}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={tailwind('pt-4')}>
                <Ionicons
                  name="camera-reverse-outline"
                  size={32}
                  color="white"
                />
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </Camera>
    </View>
  );
};
export default OpenCamera;
