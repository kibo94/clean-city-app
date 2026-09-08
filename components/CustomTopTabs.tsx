import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function CustomSwipeTabs() {
  const [index, setIndex] = useState(0);
  const translateX = useSharedValue(0);

  const handleTabPress = (i) => {
    setIndex(i);
    translateX.value = withTiming(-width * i, { duration: 250 });
  };

  // INDICATOR ANIMATION
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(index * (width / 2)) }],
    };
  });

  // SWIPE GESTURE
  const onGestureEvent = (event) => {
    const x = event.nativeEvent.translationX;
    translateX.value = -index * width + x;
  };

  const onEnd = (event) => {
    const x = event.nativeEvent.translationX;

    if (x < -80 && index < 1) {
      handleTabPress(index + 1);
    } else if (x > 80 && index > 0) {
      handleTabPress(index - 1);
    } else {
      translateX.value = withTiming(-width * index);
    }
  };

  const pageStyle = (i) =>
    useAnimatedStyle(() => ({
      transform: [
        {
          translateX: translateX.value + width * i,
        },
      ],
    }));

  return (
    <>
      {/* TOP TABS */}
      <View style={styles.tabBar}>
        <Pressable style={styles.tab} onPress={() => handleTabPress(0)}>
          <Text style={styles.tabLabel}>Chat</Text>
        </Pressable>

        <Pressable style={styles.tab} onPress={() => handleTabPress(1)}>
          <Text style={styles.tabLabel}>Mapa</Text>
        </Pressable>

        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>

      {/* SWIPEABLE CONTENT */}
      <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onEnd}>
        <Animated.View style={{ flexDirection: 'row', width: width * 2 }}>
          <Animated.View style={[styles.page, pageStyle(0)]}>
            <Text style={{ fontSize: 22 }}>Chat Screen</Text>
          </Animated.View>

          <Animated.View style={[styles.page, pageStyle(1)]}>
            <Text style={{ fontSize: 22 }}>Mapa Screen</Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: width / 2,
    backgroundColor: 'black',
  },
  page: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
