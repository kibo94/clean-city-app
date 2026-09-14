import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '~/components/CustomButton';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { Pressable, Text, View } from 'react-native';
import useAuth from '~/hooks/useAuth';
import useUserData from '~/hooks/useUserData';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const { t } = useTranslation();

  const signOutHandler = () => {
    signOut(getAuth()).then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView className="container h-full justify-center px-5">
      <Text className="font-pregular text-[18px]">
        {t('profile.email')}: {user?.email}
      </Text>
      <View className="mt-3 flex-row items-center gap-2">
        <Text className="font-pregular text-[18px]">
          {t('profile.points')}: {userData != null && userData.points}
        </Text>
        <FontAwesome6 name="coins" size={24} color="black" />
      </View>
      <CustomButton
        styles={{ background: 'black' }}
        text={t('profile.signOut')}
        onPress={signOutHandler}
      />
    </SafeAreaView>
  );
};

export default Profile;
