import '../global.css';
import { router, SplashScreen, Stack, useRootNavigationState } from 'expo-router';
import { DataProvider } from '~/context/DataContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import { useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import { useFonts } from 'expo-font';
import fonts from '~/constants/fonts';
import { loadSavedLanguage } from '~/i18n';
import {
  registerForPushNotifications,
  subscribeToForegroundMessages,
} from '~/services/notifications';
export default function Layout() {
  const { user, authChecked } = useAuth();
  const rootNavigationState = useRootNavigationState();

  const [fontsLoaded, fontError] = useFonts({});

  function initFireBaseApp() {
    if (!firebase.apps.length) {
      firebase.initializeApp();
    }
  }
  function checkAuthModule() {
    if (firebase.auth) {
      console.log('Firebase Auth Module Loaded');
      // firebase.auth().settings.appVerificationDisabledForTesting = true;
    } else {
      console.log('Firebase Auth Module Not Loaded');
    }
  }
  // Init firebase app config
  initFireBaseApp();
  checkAuthModule();

  console.log(fontsLoaded, 'fontsLoaded', fontError);

  useEffect(() => {
    void loadSavedLanguage();
  }, []);

  useEffect(() => {
    if (!authChecked || !user) return;

    void registerForPushNotifications(user.uid).then((token) => {
      if (token) console.log('FCM token:', token);
    });

    return subscribeToForegroundMessages((message) => {
      console.log('FCM foreground message:', message);
    });
  }, [authChecked, user]);

  useEffect(() => {
    const hide = async () => {
      if (authChecked && fontsLoaded && rootNavigationState?.key) {
        await SplashScreen.hideAsync();
        if (!user) {
          router.replace('/(auth)/sign-in');
        } else {
          router.replace('/(tabs)');
        }
      }
    };
    hide();
  }, [fontsLoaded, authChecked, user, rootNavigationState?.key]);
  // if (!loaded) return null;

  return (
    <DataProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="post" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </DataProvider>
  );
}
