import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import logo from '~/assets/app-img.png';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const LogoAnimation = () => {
  const scale = useSharedValue(0.5);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // STEP 1 — SCALE
    scale.value = withTiming(2, { duration: 300, easing: Easing.ease }, () => {
      // STEP 2 — ROTATE ONCE
      rotation.value = withTiming(360, {
        duration: 1000,

        easing: Easing.linear,
      });
    });
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.Image
      source={logo}
      style={[{ width: 40, height: 40, position: 'relative', top: '50%' }, animatedStyle]}
    />
  );
};

export default LogoAnimation;
