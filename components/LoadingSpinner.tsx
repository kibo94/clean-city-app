import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { CSSAnimationKeyframes } from 'react-native-reanimated';
import logo from '~/assets/app-img.png';
const FullScreenCircularSpinner = () => {
  const pulse: CSSAnimationKeyframes = {
    from: {
      transform: [{ scale: 1 }, { rotate: '-0deg' }],
    },
    to: {
      transform: [{ scale: 1.3 }, { rotate: '360deg' }],
    },
  };

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" className="text-actionBlue scale-[2]" />
    </View>
    // <Animated.Image
    //   className="translate-x-[200px]"
    //   source={logo}
    //   style={[
    //     styles.box,
    //     {
    //       animationName: pulse,
    //       animationDuration: '0.5s',
    //       animationDelay: '0s',
    //       animationIterationCount: 'infinite',
    //       animationTimingFunction: 'ease-in-out',
    //       animationDirection: 'normal',
    //     },
    //   ]}
    // />
  );
};

//  );
// };

const styles = StyleSheet.create({
  overlay: {},
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',

    height: 40,
    width: 40,
  },
});

export default FullScreenCircularSpinner;
