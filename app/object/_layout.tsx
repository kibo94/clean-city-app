import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function ObjectsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="[objectId]" options={{ title: 'Objekat' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
