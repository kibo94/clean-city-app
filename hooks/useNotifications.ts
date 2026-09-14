import { useEffect, useState } from 'react';
import useAuth from '~/hooks/useAuth';
import {
  AppNotification,
  markAllAppNotificationsAsRead,
  markAppNotificationAsRead,
  subscribeToUserNotifications,
} from '~/services/notifications';

export default function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    setNotifications([]);
    if (!user?.uid) return;

    return subscribeToUserNotifications(user.uid, setNotifications, (error) => {
      console.warn('Error loading Firestore notifications:', error);
    });
  }, [user?.uid]);

  const markAsRead = (id: string) => markAppNotificationAsRead(id);
  const markAllAsRead = () =>
    user?.uid ? markAllAppNotificationsAsRead(user.uid) : Promise.resolve();

  return {
    notifications,
    unreadCount: notifications.filter((notification) => !notification.read).length,
    markAsRead,
    markAllAsRead,
  };
}
