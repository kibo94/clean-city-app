import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ObjectModel } from '~/models/object';
import StickyFooter from '~/components/StickyFooter';
import CustomButton from '~/components/CustomButton';
import { api } from '~/utils/util';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { useModal } from '~/context/ModalContext';
import { useDate } from '~/context/DateContext';
import { router } from 'expo-router';

const ObjectScreen = () => {
  const { showGeneralPopup, hideGeneralPopup } = useModal();
  const { selectedDate } = useDate();
  const params = useRoute();
  const [object, setObject] = useState<ObjectModel | null>(null);
  const id: string = params?.params?.id;
  const fullPrice: number = params?.params?.fullPrice;
  const [user, _] = useLocalStorage('userData', null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ZA TERMINE KALENDAR STES

  useEffect(() => {
    if (id != null) {
      fetchCourtById(id);
    }
  }, [id]);

  const fetchCourtById = async (id) => {
    try {
      const res = await api.get(`/Teren/${id}`);
      setObject(res.data);
    } catch (error) {
      alert(Greška!);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    const res = await api.get(`/Review/${id}`);
    setComments(res.data);
    try {
    } catch (err) {
      console.log('Fetch comments error:', err);
    }
    setLoading(false);
  };

  // Fetch comments for this object
  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <SafeAreaView className=" relative mt-[32px] h-full">
      <View className="h-[72vh]">
        <ScrollView>
          <View className="items-center">
            <Image
              className="rounded-[4px]"
              resizeMode="cover"
              source={{
                uri: `data:image/jpeg;base64,${object?.imageBase64}`
                  ? `data:image/jpeg;base64,${object?.imageBase64}`
                  : 'https://i0.wp.com/systass.org/wp-content/uploads/2023/11/placeholder-2-1.png?resize=768%2C512&ssl=1',
                width: '80%',
                height: 170,
              }}
            />
            <View className="mt-[16px] items-center gap-[4px]">
              <Text className="font-regular text-[18px]">Ime objekta : {object?.terenName}</Text>
              <Text className="font-regular text-[18px]">Adresa objekta :{object?.address}</Text>
              <Text className="mt-[8px] w-[200px] text-center font-regular text-[18px]">
                Radno vreme objekta : {object?.openFrom.slice(0, 5)} h -{' '}
                {object?.openTo.slice(0, 5)} h
              </Text>
            </View>
          </View>

          <View className="container">
            <Text className="mb-[16px] mt-[16px] text-[18px] font-medium">Ocene</Text>

            <Comments objectId={id} currentUser={user} comments={comments} loading={loading} />
          </View>
        </ScrollView>
      </View>

      <StickyFooter offset={50}>
        <CustomButton
          text="Rezerviši"
          onPress={() => {
            const data = {
              fromTime: selectedDate.from,
              toTime: selectedDate.to,
              objectId: object?.terenId,
              objectCreatorId: user.userId,
              fullPrice: fullPrice,
            };
            router.push({
              pathname: '/appointment/reserve-appoitment',
              params: { ...data },
            });
          }}
        />
      </StickyFooter>
    </SafeAreaView>
  );
};

export default ObjectScreen;
