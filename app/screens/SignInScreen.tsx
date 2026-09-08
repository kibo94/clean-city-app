import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomForm from '~/components/CustomForm';
import FullScreenCircularSpinner from '~/components/LoadingSpinner';
import { signInInputs } from '~/constants/InputsData';
import { useData } from '~/context/DataContext';
import { useModal } from '~/context/ModalContext';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { FormFieldStateModel } from '~/models/form';
import { api, setAuthToken } from '~/utils/util';

const SignInScreen = () => {
  const { showGeneralPopup } = useModal();
  const { setCurrentUser } = useData();
  const [loading, setLoading] = useState(false);
  const [_, setUser] = useLocalStorage('userData', null);
  const signInHandler = async (data: FormFieldStateModel[]) => {
    const email = data[0].value.trim();
    const password = data[1].value.trim();
    setLoading(true);
    try {
      const res = await api.post('/User', { userEmail: email, password, userName: null });
      setUser(res.data);
      setCurrentUser(res.data);
      setAuthToken(res.data.token);
      setLoading(false);
      router.replace('/(tabs)');
    } catch (error) {
      setLoading(false);

      alert('Neispravna email adresa ili lozinka');
    }
  };

  return (
    <SafeAreaView className="container h-full justify-center bg-primary">
      {loading && <FullScreenCircularSpinner />}
      <View className="">
        <Text className="mb-[32px] text-center font-medium text-[40px]">Prijava</Text>
        <View className="mb-[16px]  w-[100%]">
          <CustomForm
            formInputs={signInInputs}
            onPress={(data: FormFieldStateModel[]) => {
              signInHandler(data);
            }}
            title={'Prijava'}
          />
        </View>
        <Link
          className="mt-[8px] text-center font-regular text-[17px] underline"
          href={'/(auth)/sign-up'}>
          Nemate nalog? kreirajte ga!
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
