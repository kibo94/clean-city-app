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
  Keyboard,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import HeaderSecondary from '~/components/HeaderSecondary';
import StickyFooter from '~/components/StickyFooter';
import CustomButton from '~/components/CustomButton';

import { router } from 'expo-router';
import { launchCamera } from 'react-native-image-picker';
import trashBag from '../../assets/trash-bag.png';
import useAuth from '~/hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import { useData } from '~/context/DataContext';
import { getDownloadURL } from '~/utils/post';

import { v4 as uuidv4 } from 'uuid';
import FullScreenCircularSpinner from '~/components/LoadingSpinner';
import { FontAwesome } from '@expo/vector-icons';
import KeyboradPadding from '~/components/KeyboradPadding';
import { useTranslation } from 'react-i18next';
const CaptureBag = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [trashResult, setTrashResult] = useState(null);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const { setImageData, imageData } = useData();
  const [createPostLoading, setCreatingPostLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
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
        const base64Image = `data:${asset.type};base64,${asset.base64}`;

        setImage(base64Image);
        setImageData([
          ...imageData,
          { uri: asset.uri || '', type: asset.type || '', name: asset.fileName || '' },
        ]);

        startScanAnimation();
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
      {createPostLoading && <FullScreenCircularSpinner />}

      {/* IMAGE PLACEHOLDER */}

      <View className="h-[90%] w-full">
        <KeyboradPadding>
          <View
            className="h-64 items-center justify-center overflow-hidden rounded-2xl bg-gray-100"
            style={{ position: 'relative' }}>
            {!image && (
              <View className="w-full ">
                <Image
                  source={trashBag}
                  resizeMode="contain"
                  style={{ height: '100%', width: '100%' }}
                />
              </View>
            )}

            {image && (
              <Image source={{ uri: image }} className="h-full w-full" resizeMode="cover" />
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
          <View className="mt-3 ">
            <Text className="font-semibold text-gray-800">{t('post.instructions')}</Text>
            <Text className="mt-1 text-left text-gray-500">{t('post.takeBagPhoto')}</Text>
          </View>
          <View className="mt-5 ">
            <Text className="mb-2 font-semibold text-gray-800">{t('post.description')}</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder={t('post.descriptionPlaceholder')}
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={500}
              textAlignVertical="top"
              className="h-24 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800"
            />
            <Text className="mt-1 text-right text-xs text-gray-400">{description.length}/500</Text>
          </View>
        </KeyboradPadding>
        {!keyboardVisible && (
          <StickyFooter>
            <CustomButton
              icon={!image ? <FontAwesome name="camera" size={24} color="white" /> : undefined}
              text={!image && !loading ? t('post.takeBagPhoto') : t('post.submit')}
              onPress={async () => {
                try {
                  if (image) {
                    if (description.trim().length === 0) {
                      alert(t('post.descriptionRequired'));
                      return;
                    }
                    setCreatingPostLoading(true);
                    const images = [];
                    for (const img of imageData) {
                      const res = await getDownloadURL(img.name, img);
                      images.push(res);
                    }
                    await firestore()
                      .collection('posts')
                      .add({
                        creator: user.email,
                        title: description.trim() || 'Prijava građanina',
                        description: description.trim(),
                        status: 'pending',
                        userId: user.uid,
                        imageUrls: images,
                      });
                    setImageData([]);
                    setCreatingPostLoading(false);
                    router.push('/(tabs)');
                    return;
                  }
                } catch (error) {
                  alert('Greska prilikom slanja upita: ' + error);
                  setCreatingPostLoading(false);
                  return;
                }
                takePhoto();
              }}
            />
          </StickyFooter>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CaptureBag;
