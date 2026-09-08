import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '~/components/CustomButton';
import { Text } from 'react-native';
import { useModal } from '~/context/ModalContext';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { router } from 'expo-router';
import { User } from '~/models/user';
const ProfileScreen = () => {
  const { showGeneralPopup } = useModal();
  const [user, setUser] = useLocalStorage<User | null>('userData', null);

  const signOutHandler = () => {
    showGeneralPopup({
      message: 'Da li želite da se odjavite',
      type: 'confirm',
      onDone: confirmLogout,
    });
  };
  const confirmLogout = () => {
    setUser(null);
    router.replace('/sign-in');
  };

  return (
    <SafeAreaView className="container h-full justify-center">
      <Text className="font-regular text-[18px]">Ime: {user?.fName}</Text>
      <Text className="font-regular text-[18px]">Prezime: {user?.lName}</Text>
      <Text className="font-regular text-[18px]">Email adresa: {user?.userEmail}</Text>
      <CustomButton text="Odjavi se" onPress={signOutHandler} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
