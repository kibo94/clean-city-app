import { signInWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomForm from '~/components/CustomForm';
import { signInInputs } from '~/constants/InputsData';
import { FormFieldStateModel } from '~/models/form';

const SignIn = () => {
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    setInputs(
      signInInputs.map((input: FormFieldStateModel) => {
        return { ...input };
      })
    );
  }, [signInInputs]);

  const signInHandler = (data: FormFieldStateModel[]) => {
    const email = data[0].value.trim();
    const password = data[1].value.trim();

    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <SafeAreaView className="container h-full justify-center bg-primary">
      <View className="">
        <Text className="mb-[32px] text-center text-[40px] font-medium">Prijava</Text>
        <View className="mb-[16px]  w-[100%]">
          <CustomForm
            formInputs={inputs}
            onPress={(data: any) => {
              signInHandler(data);
            }}
            title={'Prijava'}
            onSelectChange={null}
          />
        </View>
        <Link className="mt-[8px] text-center text-[17px] underline" href={'/(auth)/sign-up'}>
          Nemate nalog? kreirajte ga!
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
