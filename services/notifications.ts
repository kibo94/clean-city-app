import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const FCM_TOKEN_STORAGE_KEY = '@clean-city/fcm-token';
const ANDROID_CHANNEL_ID = 'default';

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  read: boolean;
};

function toMillis(value: unknown) {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number') return value;
  if (value && typeof value === 'object' && 'toMillis' in value) {
    return (value as FirebaseFirestoreTypes.Timestamp).toMillis();
  }
  return Date.now();
}

function mapNotification(document: FirebaseFirestoreTypes.QueryDocumentSnapshot): AppNotification {
  const data = document.data();
  return {
    id: document.id,
    title: String(data.title ?? 'Clean City'),
    body: String(data.body ?? data.message ?? data.description ?? ''),
    createdAt: toMillis(data.createdAt ?? data.timestamp ?? data.sentAt),
    read: data.read === true || data.isRead === true,
  };
}

export function subscribeToUserNotifications(
  userId: string,
  onNotifications: (notifications: AppNotification[]) => void,
  onError?: (error: Error) => void
) {
  return firestore()
    .collection('notifications')
    .where('userId', '==', userId)
    .onSnapshot(
      (snapshot) => {
        const notifications = snapshot.docs
          .map(mapNotification)
          .sort((first, second) => second.createdAt - first.createdAt);
        onNotifications(notifications);
      },
      (error) => onError?.(error)
    );
}

export async function markAppNotificationAsRead(id: string) {
  await firestore().collection('notifications').doc(id).update({ read: true, isRead: true });
}

export async function markAllAppNotificationsAsRead(userId: string) {
  const snapshot = await firestore()
    .collection('notifications')
    .where('userId', '==', userId)
    .get();
  const batch = firestore().batch();

  snapshot.docs.forEach((document) => {
    if (document.data().read !== true && document.data().isRead !== true) {
      batch.update(document.ref, { read: true, isRead: true });
    }
  });

  await batch.commit();
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

if (Platform.OS !== 'web') {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('FCM background message:', remoteMessage.messageId);
  });
}

export async function registerForPushNotifications(userId?: string): Promise<string | null> {
  if (Platform.OS === 'web') return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
      name: 'Default notifications',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default',
    });
  }

  const authorizationStatus = await messaging().requestPermission();
  const isAuthorized =
    authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!isAuthorized) {
    console.warn('FCM notification permission was not granted');
    return null;
  }

  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  await AsyncStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);

  if (userId) {
    const firestore = (await import('@react-native-firebase/firestore')).default;
    await firestore()
      .collection('users')
      .doc(userId)
      .set(
        {
          fcmTokens: firestore.FieldValue.arrayUnion(token),
          fcmTokenUpdatedAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  }

  return token;
}

export async function getStoredPushToken(): Promise<string | null> {
  return AsyncStorage.getItem(FCM_TOKEN_STORAGE_KEY);
}

export function subscribeToForegroundMessages(
  onMessage?: (message: FirebaseMessagingTypes.RemoteMessage) => void
) {
  if (Platform.OS === 'web') return () => undefined;

  return messaging().onMessage(async (remoteMessage) => {
    onMessage?.(remoteMessage);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title ?? 'Clean City',
        body: remoteMessage.notification?.body ?? 'You have a new notification.',
        data: remoteMessage.data,
      },
      trigger: null,
    });
  });
}

export { FCM_TOKEN_STORAGE_KEY };
