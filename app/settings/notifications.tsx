import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import useAuth from '~/hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import useUserData from '~/hooks/useUserData';
import HeaderSecondary from '~/components/HeaderSecondary';
export default function SettingsNotifications() {
  const { t } = useTranslation();
  const settingsData = [
    {
      label: t('settings.pushNotifications'),
      description: t('settings.pushNotificationsDesc'),
      type: 'push',
    },
    // { label: t('settings.dailySummary'), description: t('settings.dailySummaryDesc') },
    // { label: t('settings.reminders'), description: t('settings.remindersDesc') },
    // { label: t('settings.soundAndVibration'), description: t('settings.soundAndVibrationDesc') },
  ];
  const [values, setValues] = useState([false, false, false, false]);

  const { user } = useAuth();
  const { userData } = useUserData();
  useEffect(() => {
    if (userData) {
      setValues((prev) =>
        prev.map((item, i) => {
          if (i == 0) {
            item = userData.isPostNotificationsOn;
          }
          return item;
        })
      );
    }
  }, [userData]);

  const toggleValue = async (index: number, type: string, value: boolean) => {
    if (type == 'push') {
      try {
        setValues((prev) => prev.map((item, i) => (i === index ? !item : item)));
        await firestore().collection('users').doc(user.uid).update({
          isPostNotificationsOn: !value,
        });
      } catch (error) {
        console.error('Error getting token:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderSecondary title={t('settings.notificationsTitle')} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>{t('settings.notificationsSubtitle')}</Text>

        <View style={styles.cardList}>
          {settingsData.map((item, index) => (
            <View key={item.label} style={styles.option}>
              <View style={styles.textBox}>
                <Text style={styles.optionTitle}>{item.label}</Text>
                <Text style={styles.optionText}>{item.description}</Text>
              </View>
              <Switch
                value={values[index]}
                onValueChange={() => toggleValue(index, item.type, values[index])}
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
