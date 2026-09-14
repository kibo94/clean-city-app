import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function SettingsAbout() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t('settings.aboutTitle')}</Text>

        <View style={styles.card}>
          <Text style={styles.appName}>Clean City</Text>
          <Text style={styles.version}>{t('settings.aboutVersion')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('settings.aboutTitle')}</Text>
          <Text style={styles.text}>{t('settings.aboutDescription')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('settings.aboutContact')}</Text>
          <Text style={styles.text}>Email: support@cleancity.app</Text>
          <Text style={styles.text}>Telefon: +381 11 123 4567</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F2' },
  container: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 30 },
  title: { fontSize: 30, fontWeight: '700', color: '#171717', marginBottom: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },
  appName: { fontSize: 26, fontWeight: '800', color: '#111827', marginBottom: 4 },
  version: { fontSize: 14, color: '#6B7280' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#171717', marginBottom: 8 },
  text: { fontSize: 14, color: '#374151', lineHeight: 22 },
});
