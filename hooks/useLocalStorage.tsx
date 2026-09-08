import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(initialValue);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setData(JSON.parse(value) as T);
      } else {
        setData(initialValue);
      }
    } catch (e) {
      console.warn('Error loading local storage:', e);
    }
  };

  const storeData = async (value: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setData(value);
    } catch (e) {
      console.warn('Error saving local storage:', e);
    }
  };

  useEffect(() => {
    getData();
  }, [key]);

  return [data, storeData] as const;
}
