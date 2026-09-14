import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function SettingsHelp() {
  const { t } = useTranslation();
  const faqs = [t('settings.faq1'), t('settings.faq2'), t('settings.faq3'), t('settings.faq4')];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t('settings.helpTitle')}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('settings.helpContact')}</Text>
          <Text style={styles.text}>Email: podrška@cleancity.app</Text>
          <Text style={styles.text}>Telefon: +381 11 123 4567</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('settings.helpFaq')}</Text>
          {faqs.map((item) => (
            <Text key={item} style={styles.faqItem}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('settings.helpGuide')}</Text>
          <Text style={styles.text}>{t('settings.helpGuideText')}</Text>
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
  faqItem: { fontSize: 14, color: '#374151', marginBottom: 8 },
});
