import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function PostLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="capture-bag" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
