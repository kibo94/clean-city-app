import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '~/components/Header';
import TabBar from '~/components/TabBar';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { t } = useTranslation();
  const options = {
    headerTitleAlign: 'center',
  };

  useEffect(() => {
    if (Platform.OS === 'web') return;

    const requestNotificationPermission = async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== Notifications.PermissionStatus.GRANTED) {
          await Notifications.requestPermissionsAsync();
        }
      } catch (error) {
        console.warn('Notification permission error:', error);
      }
    };

    void requestNotificationPermission();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
        <Tabs tabBar={(props) => <TabBar {...props} />}>
          <Tabs.Screen
            name="index"
            options={{
              title: t('tabs.reports'),
              headerTitleStyle: {
                fontFamily: 'DMSansRegular',
              },
              header: (props) => <Header {...props} />,
            }}
          />

          <Tabs.Screen
            name="clients"
            options={{
              ...options,
              title: t('tabs.clients'),
              headerStyle: {
                backgroundColor: 'white',
              },
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: 'DMSansRegular',
              },
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: 'DMSansRegular',
              },
              ...options,
              title: t('tabs.settings'),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </>
  );
}
