import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useData } from '~/context/DataContext';
import { useEffect, useState } from 'react';
import { sportInputsData } from '~/constants/InputsData';
import { FormFieldStateModel } from '~/models/form';
import { blueColor } from '~/constants/colors';

const HomeScreen = () => {
  const { sports } = useData();
  const [_, setInputs] = useState<FormFieldStateModel[]>([]);

  useEffect(() => {
    if (sports && sports.length > 0) {
      const items = sports.map((sport) => ({ id: sport.sportId, name: sport.sportName }));
      const updatedInputs: FormFieldStateModel = { ...sportInputsData[0], items }; // ← FIX
      setInputs([updatedInputs]);
    }
  }, [sports]);

  // ZA SREDJIVANJE UI U COURTS ODKOMENTUJ
  useEffect(() => {
    // router.replace('/courts');
  });

  return (
    <SafeAreaView className=" h-full bg-white">
      <View className="mt-[34px] w-full items-center justify-center text-center">
        <Text className="text-actionBlue  mt-[30px] w-[75vw]  text-center font-regular text-[35px]">
          Brzo i lako do vaših termina!
        </Text>
        <View
          className=" rounded-[20px] bg-[white] p-[20px]"
          style={{
            width: '90%',
            marginTop: 32,
            overflow: 'visible',
            backgroundColor: 'rgb(199, 199, 199)',
            zIndex: -1,
            borderColor: blueColor,
            borderWidth: 1,

            position: 'relative',
          }}>
          <SearchObjects />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
