import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomForm from '~/components/CustomForm';
import { signUpInputs } from '~/constants/InputsData';
import { FormFieldStateModel } from '~/models/form';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const SignIn = () => {
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    setInputs(
      signUpInputs.map((input: FormFieldStateModel) => {
        return { ...input };
      })
    );
  }, [signUpInputs]);

  const signUpHandler = async (data: FormFieldStateModel[]) => {
    const email = data[0].value;
    const password = data[1].value;

    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);

      const user = userCredential.user;

      // 2. Create user document in Firestore
      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        points: 10,
      });

      console.log('User created successfully:', user.uid);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        console.log('Password is too weak!');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView className="container h-full justify-center bg-primary">
      <View className="">
        <Text className="mb-[32px] text-center text-[40px] font-medium">Registracija</Text>
        <View className="mb-[16px]  w-[100%]">
          <CustomForm
            formInputs={inputs}
            onPress={(data: FormFieldStateModel[]) => {
              signUpHandler(data);
            }}
            title={'Registruj se'}
            onSelectChange={null}
          />
        </View>
        <Link className="mt-[8px] text-center text-[17px] underline" href={'/(auth)/sign-in'}>
          Image nalog? prijavite se!
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
