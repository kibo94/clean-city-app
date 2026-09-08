import { View, Text } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import RoundedButton from './RoundedButton';

const HeaderSecondary = ({ title, styles, onBack = null }: any) => {
  return (
    <View
      style={{ marginTop: 40 }}
      className={`relative  mb-[40px] flex-row  items-center justify-center  ${styles}`}>
      <View
        className="absolute left-[0px]"
        style={{
          top: '50%',
          left: 0,
          transform: [
            {
              translateY: '-50%',
            },
          ],
        }}>
        <RoundedButton
          onPress={() => {
            if (onBack) {
              onBack();
              return;
            }
            router.back();
          }}
          icon={<Entypo name="chevron-small-left" size={30} color="black" />}
        />
      </View>
      <Text className="font-pmedium absolute left-[50%] translate-x-[-50%] text-center text-[22px]">
        {title}
      </Text>
    </View>
  );
};

export default HeaderSecondary;
