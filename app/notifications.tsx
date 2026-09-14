import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderSecondary from '~/components/HeaderSecondary';
import useNotifications from '~/hooks/useNotifications';

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  const openNotification = async (id: string) => {
    await markAsRead(id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderSecondary title={t('notificationInbox.title')} styles="mb-[18px]" />
        <View style={styles.headingRow}>
          <Text style={styles.subtitle}>{t('notificationInbox.subtitle')}</Text>
          {unreadCount > 0 && (
            <Pressable onPress={markAllAsRead} hitSlop={8}>
              <Text style={styles.markAll}>{t('notificationInbox.markAllRead')}</Text>
            </Pressable>
          )}
        </View>

        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="notifications-off-outline" size={30} color="#047857" />
            </View>
            <Text style={styles.emptyTitle}>{t('notificationInbox.emptyTitle')}</Text>
            <Text style={styles.emptyText}>{t('notificationInbox.emptyText')}</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {notifications.map((notification) => (
              <Pressable
                key={notification.id}
                onPress={() => void openNotification(notification.id)}
                style={[styles.notification, !notification.read && styles.unreadNotification]}>
                <View style={styles.iconWrap}>
                  <Ionicons name="notifications-outline" size={20} color="#047857" />
                </View>
                <View style={styles.notificationCopy}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationBody}>{notification.body}</Text>
                  <Text style={styles.dateText}>
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                {!notification.read && (
                  <Pressable
                    onPress={() => void markAsRead(notification.id)}
                    hitSlop={10}
                    accessibilityLabel={t('notificationInbox.markRead')}>
                    <Ionicons name="checkmark-circle-outline" size={24} color="#6B7280" />
                  </Pressable>
                )}
              </Pressable>
            ))}
          </View>
        )}

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{t('notificationInbox.back')}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F2' },
  container: { paddingHorizontal: 18, paddingBottom: 30 },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  subtitle: { flex: 1, paddingRight: 12, fontSize: 14, color: '#6B7280', lineHeight: 20 },
  markAll: { fontSize: 13, fontWeight: '700', color: '#047857' },
  list: { gap: 10 },
  notification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 15,
  },
  unreadNotification: { borderColor: '#A7F3D0', backgroundColor: '#F0FDF4' },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    marginRight: 12,
  },
  notificationCopy: { flex: 1, paddingRight: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  notificationTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#171717' },
  notificationBody: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  dateText: { marginTop: 8, fontSize: 12, color: '#9CA3AF' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#059669', marginLeft: 8 },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 42,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    marginBottom: 14,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#171717', marginBottom: 6 },
  emptyText: { textAlign: 'center', fontSize: 14, color: '#6B7280', lineHeight: 20 },
  backButton: { alignSelf: 'center', marginTop: 24, paddingVertical: 8 },
  backButtonText: { fontSize: 14, fontWeight: '700', color: '#047857' },
});
