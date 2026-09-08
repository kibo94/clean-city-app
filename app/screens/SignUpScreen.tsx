import { Link, router } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomForm from '~/components/CustomForm';
import { signUpInputs } from '~/constants/InputsData';
import { FormFieldStateModel } from '~/models/form';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { api } from '~/utils/util';
import KeyboradPadding from '~/components/KeyboradPadding';
import { useState } from 'react';
import FullScreenCircularSpinner from '~/components/LoadingSpinner';

const SignUpScreen = () => {
  const [_, setUser] = useLocalStorage('userData', null);
  const [loading, setLoading] = useState(false);

  const signUp = async (data: FormFieldStateModel[]) => {
    setLoading(true);
    const signupData = {};

    data.forEach((field) => {
      signupData[field.name] = field.value;
    });

    const signupPayload = {
      ...signupData,

      userId: 0,
      userEmail: signupData.email,
    };
    delete signupPayload.email; // Remove the original email field

    try {
      const res = await api.post('/User/CreateBeneficiary', signupPayload);
      setUser({ ...signupPayload, token: res.data.token, userId: res.data.userId });
      setLoading(false);
      router.replace('/(tabs)');
    } catch (error) {
      console.log('Error during sign up:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="container h-full flex-1 justify-center bg-primary">
      {loading && <FullScreenCircularSpinner />}
      <View className="mt-[32px] flex-1 justify-between">
        <Text className="mb-[16px] text-center text-[40px] font-medium">Registracija</Text>
        <KeyboradPadding>
          <View className="mb-[16px]  w-[100%]">
            <CustomForm
              formInputs={signUpInputs}
              onPress={(data: FormFieldStateModel[]) => {
                signUp(data);
              }}
              title={'Registruj se'}
            />
          </View>

          <Link
            className="mt-[8px] text-center font-regular text-[17px] underline"
            href={'/(auth)/sign-in'}>
            Image nalog? prijavite se!
          </Link>
        </KeyboradPadding>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
