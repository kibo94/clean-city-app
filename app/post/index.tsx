import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Easing,
  Animated,
} from 'react-native';
import React, { useRef, useState } from 'react';
import HeaderSecondary from '~/components/HeaderSecondary';
import StickyFooter from '~/components/StickyFooter';
import CustomButton from '~/components/CustomButton';

import { router } from 'expo-router';
import { launchCamera } from 'react-native-image-picker';
import trash from '../../assets/trash.png';
import { useData } from '~/context/DataContext';
import { FontAwesome } from '@expo/vector-icons';

const index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [trashResult, setTrashResult] = useState(null);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const { setImageData, imageData } = useData();
  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,

        quality: 0.7,
      },
      (response) => {
        if (response.didCancel || !response.assets?.[0]) return;

        const asset = response.assets[0];
        // const base64Image = `data:${asset.type};base64,${asset.base64}`;

        setImage(asset.uri || null);
        setImageData([
          ...imageData,
          { uri: asset.uri || '', type: asset.type || '', name: asset.fileName || '' },
        ]);

        startScanAnimation();
        setLoading(false);
      }
    );
  };

  const startScanAnimation = () => {
    setLoading(true);
    Animated.timing(scanAnim, {
      toValue: 1,
      duration: 2200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {});
  };

  const requestImagePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      if (Platform.Version >= 33) {
        return (
          (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)) ===
          PermissionsAndroid.RESULTS.GRANTED
        );
      }

      return (
        (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)) ===
        PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };
  const scanTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <SafeAreaView className="flex-1  bg-white p-4">
      <HeaderSecondary />

      {/* IMAGE PLACEHOLDER */}
      <View className="h-[90%] items-center">
        <View
          className="items-center justify-center overflow-hidden rounded-2xl"
          style={{ position: 'relative' }}>
          {!image && (
            <View className="items-center">
              <Image source={trash} resizeMode="contain" style={{ height: 200, width: 300 }} />
            </View>
          )}

          {image && (
            <Image
              source={{ uri: image }}
              className="h-full w-full"
              resizeMode="cover"
              style={{ height: 200, width: 300 }}
            />
          )}

          {/* SCANNING BAR */}
          {loading && (
            <Animated.View
              style={{
                position: 'absolute',
                width: '100%',
                height: 4,
                backgroundColor: '#00ff00',
                opacity: 0.8,
                transform: [{ translateY: scanTranslate }],
              }}
            />
          )}

          {/* LOTTIE SCAN OVERLAY */}
          {/* {loading && (
            <LottieView
              source={require('~/assets/scan.json')}
              autoPlay
              loop
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            />
          )} */}
        </View>
        <View className="mt-3 w-[300px]">
          <Text className="text-3xl font-semibold text-gray-800">Uputstvo</Text>
          <Text className="mt-1 text-left text-gray-500">
            Slikajte pronadjeno djubre tako da bude jasno vidljivo na fotografiji.
          </Text>
        </View>
        <StickyFooter>
          <CustomButton
            icon={!image ? <FontAwesome name="camera" size={24} color="white" /> : undefined}
            text={image && !loading ? 'Slikaj djubre u kesi' : 'Slikaj djubre'}
            onPress={() => {
              if (image) {
                router.push('/post/capture-bag');
                return;
              }
              takePhoto();
            }}
          />
        </StickyFooter>
      </View>
    </SafeAreaView>
  );
};

export default index;
