import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ObjectModel } from '~/models/object';
import { useState } from 'react';
import FullScreenCircularSpinner from './LoadingSpinner';
import CustomButton from './CustomButton';
import { blueColor } from '~/constants/colors';
import Line from './Line';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { useData } from '~/context/DataContext';

const ObjectsList = ({ onReserve }) => {
  const { objects } = useData();
  const [isLoading] = useState(false);

  const viewObject = (id: string, fullPrice: number) => {
    router.push({
      pathname: '/object/[objectId]',
      params: { id, fullPrice },
    });
  };

  return (
    <View className="container">
      <Text className=" mt-[24px] font-medium text-[35px]">Tereni</Text>
      <Line bgColor="#e4e3e3ff" />

      <ScrollView style={{ height: '75%', marginTop: 32 }}>
        {isLoading ? (
          <View className="mt-[24px]">
            <FullScreenCircularSpinner />
          </View>
        ) : (
          objects &&
          objects.length > 0 &&
          objects.map((obj: ObjectModel) => {
            return (
              <Pressable
                className=" 
               w-[95%] justify-between   rounded-[20px] bg-[white] p-[20px]"
                style={{
                  elevation: 4,
                  shadowRadius: 12,
                  overflow: 'visible',
                  paddingBottom: 60,

                  marginBottom: 12,
                  shadowColor: blueColor,
                  marginHorizontal: 'auto',
                }}
                onPress={() => viewObject(obj.terenId, obj.fullPrice)}>
                <View className="flex-row items-center justify-between">
                  <Text className="mb-[16px] w-[150px] text-left font-medium text-[22px] text-[black]">
                    {obj['terenName']}
                  </Text>
                </View>
                <View className="absolute  right-[20px] top-[20px] flex-row items-center justify-center gap-[2px]">
                  <Text
                    className=" text-left font-medium text-[16px] "
                    style={{ color: '#a3a3a3ff' }}>
                    {obj.address ?? 'nema adrese '}
                  </Text>
                  <EvilIcons name="location" size={24} color="#a3a3a3ff" />
                </View>
                {/* <ImagCarousel images={obj.images} /> */}
                <Image
                  source={{ uri: `data:image/jpeg;base64,${obj['imageBase64']}` }}
                  height={120}
                />

                <View className="flex-row items-center justify-between">
                  <CustomButton
                    text="Izaberi teren"
                    styles={{ width: 140 }}
                    onPress={() => onReserve(obj)}
                  />

                  <View className="flex-row items-center">
                    <Text className="p-2 font-medium text-[18px]" style={{ alignSelf: 'flex-end' }}>
                      {obj.averageGrade}
                    </Text>
                    <AntDesign name="star" size={24} color="rgba(197, 212, 83, 0.8)" />
                  </View>
                </View>
                <Text className="absolute bottom-[20px] right-[20px] font-medium text-[16px]">
                  Ukupna cena termina: <Text className="font-medium">{obj.fullPrice}RSD</Text>
                </Text>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default ObjectsList;
