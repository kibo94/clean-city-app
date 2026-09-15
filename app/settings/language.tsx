import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { changeLanguage, Language } from '~/i18n';
import HeaderSecondary from '~/components/HeaderSecondary';

export default function SettingsLanguage() {
  const { t, i18n } = useTranslation();

  const languageOptions = [
    {
      key: 'sr' as const,
      label: t('settings.languageSr'),
      flag: '🇷🇸',
      subtitle: t('settings.languageSrSubtitle'),
    },
    {
      key: 'en' as const,
      label: t('settings.languageEn'),
      flag: '🇬🇧',
      subtitle: t('settings.languageEnSubtitle'),
    },
    {
      key: 'de' as const,
      label: t('settings.languageDe'),
      flag: '🇩🇪',
      subtitle: t('settings.languageDeSubtitle'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderSecondary title={t('settings.languageTitle')} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text className="font-regular" style={styles.subtitle}>
          {t('settings.languageSubtitle')}
        </Text>

        <View style={styles.cardList}>
          {languageOptions.map((item) => {
            const active = i18n.language === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => {
                  void changeLanguage(item.key as Language);
                }}
                style={[styles.option, active && styles.optionActive]}>
                <View style={styles.optionRow}>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View style={styles.labelBox}>
                    <Text style={[styles.optionText, active && styles.optionTextActive]}>
                      {item.label}
                    </Text>
                    <Text
                      className="font-regular"
                      style={[styles.optionSubtitle, active && styles.optionSubtitleActive]}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                {active && <View style={styles.checkMark} />}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F2' },
  container: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 30 },
  title: { fontSize: 30, color: '#171717', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#4B5563', marginBottom: 18 },
  cardList: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: { fontSize: 30, marginRight: 14 },
  labelBox: { flex: 1 },
  optionText: { fontSize: 17, fontWeight: '700', color: '#171717' },
  optionTextActive: { color: '#FFFFFF' },
  optionSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 3 },
  optionSubtitleActive: { color: '#E5E7EB' },
  checkMark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22C55E',
    marginLeft: 12,
  },
});
