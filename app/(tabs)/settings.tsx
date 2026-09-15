import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import SettingsSection from '~/components/SettingsSection';
import useAuth from '~/hooks/useAuth';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const settingsSections = [
    {
      title: t('settings.profile'),
      icon: <Ionicons name="person-outline" size={26} color="#1F1F1F" />,
      screen: '/settings/profile',
    },
    {
      title: t('settings.language'),
      icon: <Ionicons name="globe-outline" size={26} color="#1F1F1F" />,
      screen: '/settings/language',
    },
    {
      title: t('settings.notifications'),
      icon: <Ionicons name="notifications-outline" size={26} color="#1F1F1F" />,
      screen: '/settings/notifications',
    },
    {
      title: t('settings.permissions'),
      icon: <Ionicons name="shield-checkmark-outline" size={26} color="#1F1F1F" />,
      screen: '/settings/permissions',
    },
  ];

  const helpSections = [
    {
      title: t('settings.about'),
      icon: <Ionicons name="information-circle-outline" size={26} color="#1F1F1F" />,
      screen: '/settings/about',
    },
    {
      title: t('settings.privacy'),
      icon: <Ionicons name="document-text-outline" size={26} color="#1F1F1F" />,
      screen: '/settings/privacy',
    },
    {
      title: t('settings.help'),
      icon: <Ionicons name="help-circle-outline" size={26} color="#1F1F1F" />,
      screen: '/settings/help',
    },
  ];

  const socialLinks = [
    // {
    //   title: t('settings.rateApp'),
    //   icon: <Ionicons name="star-outline" size={26} color="#1F1F1F" />,
    //   screen: null,
    // },
    // {
    //   title: t('settings.instagram'),
    //   icon: <FontAwesome5 name="instagram" size={26} color="#1F1F1F" />,
    //   screen: null,
    // },
    // {
    //   title: t('settings.facebook'),
    //   icon: <FontAwesome5 name="facebook-f" size={26} color="#1F1F1F" />,
    //   screen: null,
    // },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarBadge}>
            <Text style={styles.avatarText}>
              {}
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            {/* <Text style={styles.userName}>Bojan Bogdanović</Text> */}
            <Text style={styles.userId}>Email:{user?.email}</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.listScroll}>
          <View style={styles.listCard}>
            {settingsSections.map((item) => (
              <SettingsSection item={item} />
            ))}
          </View>

          <View style={[styles.listCard, styles.secondCard]}>
            {helpSections.map((item) => (
              <SettingsSection item={item} />
            ))}
          </View>

          <View style={[styles.listCard, styles.thirdCard]}>
            {socialLinks.map((item) => (
              <SettingsSection item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginBottom: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '500',
    color: '#171717',
    letterSpacing: -1,
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 18,
    color: '#171717',
    fontWeight: '600',
  },
  signalGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 18,
  },
  signalBar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: '#171717',
    minHeight: 6,
    marginBottom: 0,
    opacity: 0.9,
  },
  batteryWrap: {
    width: 26,
    height: 12,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#171717',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 2,
  },
  batteryBody: {
    flex: 1,
    height: 6,
    borderRadius: 2,
    backgroundColor: '#171717',
  },
  batteryCap: {
    width: 2,
    height: 6,
    backgroundColor: '#171717',
    marginLeft: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  avatarBadge: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
  },
  userInfo: {
    flex: 1,
    paddingRight: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
    lineHeight: 24,
  },
  userId: {
    marginTop: 4,
    fontSize: 18,
    color: '#171717',
    opacity: 0.8,
  },
  badgeIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listScroll: {
    flex: 1,
    marginBottom: 8,
  },
  listCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 22,
    paddingHorizontal: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  secondCard: {
    marginBottom: 16,
  },
  thirdCard: {
    marginBottom: 18,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
});

export default SettingsScreen;
