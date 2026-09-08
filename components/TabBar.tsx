import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import reportsIcon from '~/assets/reports.png';
import clientsIcon from '~/assets/clients.png';
import profileIcon from '~/assets/profile.png';

const TabBar = ({ state, descriptors, navigation }) => {
  const { width } = Dimensions.get('window');

  const icons = {
    index: (color: string) => (
      <Image
        resizeMode="contain"
        source={reportsIcon}
        style={{ width: 22, height: 22, tintColor: color }}
      />
    ),
    objects: (color: string) => (
      <Image
        resizeMode="contain"
        source={clientsIcon}
        style={{ width: 32, height: 32, tintColor: color }}
      />
    ),
    profile: (color: string) => (
      <Image
        resizeMode="contain"
        source={profileIcon}
        style={{ width: 22, height: 22, tintColor: color }}
      />
    ),
  };

  return (
    <View
      className="bg-[black]"
      style={{
        height: 70,
        position: 'relative',
        zIndex: 20,

        overflow: 'visible',
        borderRadius: 30,
        bottom: 10,
        width: width - 20,
        paddingBottom: 20,
        left: 10,
      }}>
      <View className="absolute left-0 right-0 top-[-45] items-center px-5" style={{ zIndex: 30 }}>
        <CustomButton
          icon={<FontAwesome6 name="add" size={30} color="white" />}
          text="Kreiraj upit za djubre"
          onPress={() => navigation.getParent()?.navigate('post')}
          styles={{ marginTop: 0, width: 280, fontSize: 18 }}
          textStyles={{ fontSize: 17 }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: width - 20,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingHorizontal: 0,

          zIndex: 1,
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconColor = isFocused ? 'white' : 'lightgrey';

          return (
            <TouchableOpacity
              key={index}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className=" gap-[3px]"
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {icons[route.name](iconColor)} {}
              </View>

              <Text
                style={{
                  color: iconColor,
                  fontSize: 14,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
