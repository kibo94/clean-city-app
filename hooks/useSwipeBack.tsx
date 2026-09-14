import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from 'expo-router';

export function useBackAction(handler: () => void) {
  const navigation = useNavigation();
 

  useEffect(() => {
    const beforeRemove = (e: any) => {
      // ❗ stop default back
      e.preventDefault();

      // ❗ Temporarily remove listeners da IZBEGNE loop
      navigation.dispatch((state) => {
        const routes = state.routes.slice(0, -1);
        return {
          ...state,
          routes,
          index: routes.length - 1,
        };
      });

      // ❗ Sad je bezbedno trigerovati handler
      handler();
    };

    const unsubscribe = navigation.addListener('beforeRemove', beforeRemove);

    const hardwareBack = BackHandler.addEventListener('hardwareBackPress', () => {
      handler();
      return true;
    });

    return () => {
      unsubscribe();
      hardwareBack.remove();
    };
  }, [navigation, handler]);
}
