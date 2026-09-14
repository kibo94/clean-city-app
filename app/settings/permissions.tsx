import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';
export default function SettingsPermissions() {
  const { t } = useTranslation();
  const permissionData = [
    // { label: t('settings.camera'), description: t('settings.cameraDesc') },
    // { label: t('settings.location'), description: t('settings.locationDesc') },
    {
      label: t('settings.notificationsAccess'),
      description: t('settings.notificationsAccessDesc'),
    },
  ];
  const [values, setValues] = useState([false, false]);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    const checkNotificationPermission = async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        setValues((prev) =>
          prev.map((value, index) =>
            index === 1 ? status === Notifications.PermissionStatus.GRANTED : value
          )
        );
      } catch (error) {
        console.warn('Notification permission error:', error);
      }
    };
    void checkNotificationPermission();
  }, []);
  const toggleValue = () => {
    if (Platform.OS === 'web') return;
    Linking.openSettings();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t('settings.permissionsTitle')}</Text>
        <Text style={styles.subtitle}>{t('settings.permissionsSubtitle')}</Text>

        <View style={styles.cardList}>
          {permissionData.map((item, index) => (
            <View key={item.label} style={styles.option}>
              <View style={styles.textBox}>
                <Text style={styles.optionTitle}>{item.label}</Text>
                <Text style={styles.optionText}>{item.description}</Text>
              </View>
              <Switch
                value={values[index]}
                onValueChange={() => toggleValue(index)}
                trackColor={{ false: '#D1D5DB', true: '#111827' }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F2' },
  container: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 30 },
  title: { fontSize: 30, fontWeight: '700', color: '#171717', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#4B5563', marginBottom: 18 },
  cardList: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textBox: { flex: 1, paddingRight: 14 },
  optionTitle: { fontSize: 17, fontWeight: '700', color: '#171717', marginBottom: 4 },
  optionText: { fontSize: 12, color: '#6B7280', lineHeight: 18 },
});
