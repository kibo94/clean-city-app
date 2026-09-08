import { View, Text, Platform, StatusBar, Pressable, Image, TouchableOpacity } from 'react-native';
import logo from '~/assets/logo.png';
import coin from '~/assets/coin.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { useData } from '~/context/DataContext';
import useAuth from '~/hooks/useAuth';
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import { addIcon } from '~/assets/icons/add.png';
import useUserData from '~/hooks/useUserData';
const Header = () => {
  const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 20;
  const { user } = useAuth();
  const { userData } = useUserData();
  return (
    <View
      className="container  w-full flex-row items-center justify-between border-b border-b-[#E0E0E0] bg-[white]"
      style={{ paddingTop: statusBarHeight - 5, paddingHorizontal: 16, paddingBottom: 16 }}>
      <Image source={logo} style={{ height: 50, width: 70 }} resizeMode="cover" />
      <View className="flex-row items-center justify-center gap-[10px]">
        <Image source={addIcon} style={{ width: 24, height: 24 }} resizeMode="cover" />
        <View className="mr-2 flex-row items-center gap-2">
          <Image source={coin} style={{ width: 30, height: 30 }} resizeMode="contain" />
          <Text className="font-bold text-[18px]">{userData != null && userData.points}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/profile')}
          className="h-[40px] w-[40px] items-center justify-center rounded-full bg-[#E6F4EA]">
          <Text className="font-bold text-[16px] text-[#047857]">
            {user?.email[0].toUpperCase()}
          </Text>
        </TouchableOpacity>
        {/* <View className="flex-row items-center justify-center gap-[8px] ">
          <Pressable
            className="flex-row items-center gap-[8px] rounded-[8px] bg-[grey] p-3"
            onPress={() => router.push('/calendar')}>
            <Text className="font-medium text-[white]">
              {selectedDate.getDate()} {getMonthName(selectedDate.getMonth() + 1)}
            </Text>
            <FontAwesome5 name="calendar-alt" size={18} color="white" />
          </Pressable>
          <View className="relative ">
            <Ionicons name="notifications" size={24} color="#969696" />
            <View className="z-3 absolute right-[-5px] top-[-4px] h-[18px] w-[18px] items-center justify-center rounded-full bg-[black]">
              <Text className="text-[white]">2</Text>
            </View>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default Header;
