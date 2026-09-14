import { Tabs } from 'expo-router';
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
            name="clients"
            options={{
              ...options,
              title: t('tabs.clients'),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              ...options,
              title: t('tabs.settings'),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </>
  );
}
