import React, { FC, useEffect, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import { Camera } from 'expo-camera';
import tailwind from 'tailwind-rn';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

const OpenCamera: FC<{
	closeCamera?: () => void;
	updateImageInfo: (uri: string) => void;
	showMySelf?: boolean | undefined | null
}> = (props) => {
	const [hasPermission, setHasPermission] = useState(false);
	const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [imageInfo, setImageInfo] = useState();
  const cameraRef = useRef();
  const WINDOW_HEIGHT = Dimensions.get('window').height - 180;

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    onHandlePermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Permission to use the camera has been Denied</Text>;
  }
  const saveImage = () => {
    props.updateImageInfo(imageInfo.uri, imageInfo.base64);
    props.closeCamera();
  };

  const onSnap = async () => {
    console.log(Math.random());
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImageInfo(data);
      const source = data.base64;

      if (source) {
        await cameraRef.current.pausePreview();
				setIsPreview(true);
			}
		}
	};

	const cancelPreview = async () => {
		await cameraRef.current.resumePreview();
		setIsPreview(false);
	};

	if (props.showMySelf === false) return null;
	return (
		<View>
			<Camera ref={cameraRef} type={type} style={tailwind('h-full')}>
				<>
					{isPreview && (
						<>
							<View
								style={[
									tailwind('flex-1 flex-row justify-center'),
									{ marginTop: WINDOW_HEIGHT },
								]}
							>
								<TouchableOpacity
									onPress={cancelPreview}
									activeOpacity={0.7}
									style={tailwind('mx-4 mt-9')}
								>
									<AntDesign name='closecircleo' size={56} color='grey' />
								</TouchableOpacity>

								<TouchableOpacity
									onPress={saveImage}
									activeOpacity={0.7}
									style={tailwind('m-4')}
								>
									<AntDesign name='checkcircleo' size={84} color='#0275d8' />
								</TouchableOpacity>
							</View>
						</>
					)}
					{!isPreview && (
						<>
							<View style={tailwind('flex-1 flex-row justify-between')}>
								<TouchableOpacity
									style={tailwind('m-4 mt-5')}
									onPress={() => {
										props.closeCamera();
									}}
								>
									<Text>
										<AntDesign name='closecircleo' size={32} color='grey' />
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={tailwind('m-4')}
									onPress={() => {
										setType(
											type === Camera.Constants.Type.back
												? Camera.Constants.Type.front
												: Camera.Constants.Type.back,
										);
									}}
								>
									<Text>
										<Ionicons
											name='camera-reverse-outline'
											size={32}
											color='grey'
										/>
									</Text>
								</TouchableOpacity>
							</View>
							<View style={tailwind('mb-8')}>
								<TouchableOpacity onPress={onSnap}>
									<Text style={tailwind('text-center')}>
										<MaterialIcons name='camera' size={80} color='white' />
									</Text>
								</TouchableOpacity>
							</View>
						</>
					)}
				</>
			</Camera>
		</View>
	);
};
export default OpenCamera;
