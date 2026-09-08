import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '~/components/CustomButton';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { Pressable, Text, View } from 'react-native';
import useAuth from '~/hooks/useAuth';
import useUserData from '~/hooks/useUserData';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { changeLanguage, languages, Language } from '~/i18n';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const { t, i18n } = useTranslation();
  const signOutHandler = () => {
    signOut(getAuth()).then(() => console.log('User signed out!'));
  };
  const languageFlags: Record<Language, string> = {
    sr: '🇷🇸',
    en: '🇬🇧',
    de: '🇩🇪',
  };

  return (
    <SafeAreaView className="container h-full justify-center">
      <Text className="font-pregular text-[18px]">
        {t('profile.email')}: {user?.email}
      </Text>
      <View className="flex-row items-center gap-2">
        <Text className="font-pregular text-[18px]">
          {t('profile.points')}: {userData != null && userData.points}
        </Text>
        <FontAwesome6 name="coins" size={24} color="black" />
      </View>
      <Text className="mt-8 font-bold text-lg">{t('profile.language')}</Text>
      <View className="mt-3 flex-row gap-2">
        {(Object.keys(languages) as Language[]).map((language) => (
          <Pressable
            key={language}
            onPress={() => changeLanguage(language)}
            className={`flex-row items-center rounded-full px-4 py-2 ${i18n.language === language ? 'bg-black' : 'bg-gray-200'}`}>
            <Text className="mr-2 text-base">{languageFlags[language]}</Text>
            <Text className={i18n.language === language ? 'text-white' : 'text-gray-700'}>
              {languages[language]}
            </Text>
          </Pressable>
        ))}
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
