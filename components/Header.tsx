import {
  View,
  Text,
  Platform,
  StatusBar,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
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
import useNotifications from '~/hooks/useNotifications';
const Header = () => {
  const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 20;
  const { user } = useAuth();
  const { userData } = useUserData();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const recentNotifications = notifications.slice(0, 4);
  return (
    <View
      className="container  w-full flex-row items-center justify-between border-b border-b-[#E0E0E0] bg-[white]"
      style={{ paddingTop: statusBarHeight - 5, paddingHorizontal: 16, paddingBottom: 16 }}>
      <Image source={logo} style={{ height: 50, width: 70 }} resizeMode="cover" />
      <View className="flex-row items-center justify-center gap-[10px]">
        <Image source={addIcon} style={{ width: 24, height: 24 }} resizeMode="cover" />
        <View className="mr-2 flex-row items-center gap-2">
          <Image source={coin} style={{ width: 30, height: 30 }} resizeMode="contain" />
          <Text className="font-regular text-[18px]">{userData != null && userData.points}</Text>
        </View>
        <Pressable
          onPress={() => setNotificationsOpen(true)}
          accessibilityLabel="Open notifications"
          className="relative h-[40px] w-[40px] items-center justify-center rounded-full bg-[#F0FDF4]">
          <Ionicons name="notifications-outline" size={22} color="#047857" />
          {unreadCount > 0 && (
            <View className="absolute right-[-2px] top-[-2px] min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#DC2626] px-[4px]">
              <Text className="font-bold text-[11px] text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </Pressable>
        <TouchableOpacity
          onPress={() => router.push('/settings/profile')}
          className="h-[40px] w-[40px] items-center justify-center rounded-full bg-[#E6F4EA]">
          <Text className="font-bolds text-[16px] text-[#047857]">
            {user?.email[0].toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        visible={isNotificationsOpen}
        animationType="fade"
        onRequestClose={() => setNotificationsOpen(false)}>
        <Pressable style={{ flex: 1 }} onPress={() => setNotificationsOpen(false)}>
          <Pressable style={styles.dropdown} onPress={(event) => event.stopPropagation()}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Notifications</Text>
              <Pressable
                onPress={() => {
                  setNotificationsOpen(false);
                  router.push('/notifications' as never);
                }}>
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            </View>
            {recentNotifications.length === 0 ? (
              <Text style={styles.emptyText}>You are all caught up.</Text>
            ) : (
              <ScrollView style={styles.dropdownList} nestedScrollEnabled>
                {recentNotifications.map((notification) => (
                  <Pressable
                    key={notification.id}
                    style={[styles.dropdownItem, !notification.read && styles.dropdownUnread]}
                    onPress={() => {
                      void markAsRead(notification.id);
                      setNotificationsOpen(false);
                      router.push('/notifications' as never);
                    }}>
                    <View style={styles.dropdownDot} />
                    <View style={styles.dropdownCopy}>
                      <Text style={styles.dropdownItemTitle} numberOfLines={1}>
                        {notification.title}
                      </Text>
                      <Text style={styles.dropdownItemBody} numberOfLines={2}>
                        {notification.body}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = {
  dropdown: {
    position: 'absolute' as const,
    top: Platform.OS === 'ios' ? 92 : 76,
    right: 14,
    width: 310,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },
  dropdownHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 8,
  },
  dropdownTitle: { fontSize: 17, fontWeight: '700' as const, color: '#171717' },
  viewAll: { fontSize: 13, fontWeight: '700' as const, color: '#047857' },
  dropdownList: { maxHeight: 280 },
  dropdownItem: {
    flexDirection: 'row' as const,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  dropdownUnread: { backgroundColor: '#F0FDF4' },
  dropdownDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginTop: 7,
    marginRight: 9,
  },
  dropdownCopy: { flex: 1 },
  dropdownItemTitle: { fontSize: 14, fontWeight: '700' as const, color: '#171717' },
  dropdownItemBody: { marginTop: 2, fontSize: 12, color: '#6B7280', lineHeight: 17 },
  emptyText: { paddingVertical: 20, textAlign: 'center' as const, color: '#6B7280', fontSize: 13 },
};

export default Header;
