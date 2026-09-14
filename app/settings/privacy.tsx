import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function SettingsPrivacy() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t('settings.privacyTitle')}</Text>

        <View style={styles.card}>
          <Text style={styles.text}>{t('settings.privacyIntro')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('settings.privacyCollect')}</Text>
          <Text style={styles.text}>{t('settings.privacyInfo')}</Text>
          <Text style={styles.text}>{t('settings.privacyLocation')}</Text>
          <Text style={styles.text}>{t('settings.privacyPhotos')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('settings.privacyProtection')}</Text>
          <Text style={styles.text}>{t('settings.privacyProtectionText')}</Text>
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
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#171717', marginBottom: 8 },
  text: { fontSize: 14, color: '#374151', lineHeight: 22 },
});
