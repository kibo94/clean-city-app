import { Tabs } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '~/components/Header';
import TabBar from '~/components/TabBar';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();
  const options = {
    headerTitleAlign: 'center',
  };
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
        <Tabs tabBar={(props) => <TabBar {...props} />}>
          <Tabs.Screen
            name="index"
            options={{
              title: t('tabs.reports'),
              header: (props) => <Header {...props} />,
            }}
          />

          <Tabs.Screen
            name="objects"
            options={{
              ...options,
              title: t('tabs.clients'),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              ...options,
              title: t('tabs.profile'),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </>
  );
}
