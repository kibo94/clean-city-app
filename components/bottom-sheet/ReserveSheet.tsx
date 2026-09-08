import moment from 'moment';
import CustomButton from '../CustomButton';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { getDayString } from '~/utils/dateUtil';
import { ReserveSheetPropsModel } from '~/models/props';

const ReserveSheet = ({
  from,
  to,
  objectId,
  fullPrice,
  objectCreatorId,
  bottomSheetRef,
  clientId,
}: ReserveSheetPropsModel) => {
  const dayName: string = getDayString(new Date(from).getDay());

  return (
    <View className="mb-[45px]">
      <View className=" flex-row items-center justify-center" style={{}}>
        <Text className=" text-center font-medium text-[20px]">
          {dayName}, {moment(from).format('HH:mm')}h - {moment(to).format('HH:mm')} h
        </Text>
      </View>

      <CustomButton
        text="Rezerviši"
        onPress={() => {
          bottomSheetRef.current?.close();
          const data = {
            fullPrice,
            fromTime: from,
            toTime: to,
            objectId,
            objectCreatorId,
            clientId,
          };

          router.push({
            pathname: '/appointment/reserve-appoitment',
            params: { ...data },
          });
        }}
      />
      <Pressable
        onPress={() => {
          bottomSheetRef.current?.close();
        }}></Pressable>
    </View>
  );
};

export default ReserveSheet;
