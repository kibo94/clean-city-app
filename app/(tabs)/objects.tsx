import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

type Client = {
  id: string;
  companyName?: string;
  logoUrl?: string;
  discountPerPoint?: number;
};

const Clients = () => {
  const { t } = useTranslation();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const loadClients = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(false);

    try {
      const snapshot = await firestore().collection('clients').orderBy('companyName').get();
      setClients(
        snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        })) as Client[]
      );
    } catch (loadError) {
      console.error('Error loading clients:', loadError);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  console.log(clients);

  const renderClient = ({ item }: { item: Client }) => {
    const logoUri = item.logoUrl;
    const initials = (item.companyName || 'Klijent').slice(0, 2).toUpperCase();

    return (
      <View className="mb-4 rounded-[24px] border border-[#E6EBE5] bg-white p-5 shadow-sm">
        <View className="flex-row items-center">
          {logoUri ? (
            <Image
              source={{ uri: logoUri }}
              className="h-16 w-16 rounded-2xl bg-[#F2F6F0]"
              resizeMode="contain"
            />
          ) : (
            <View className="h-16 w-16 items-center justify-center rounded-2xl bg-[#0A378B]">
              <Text className="font-bold text-lg text-white">{initials}</Text>
            </View>
          )}

          <View className="ml-4 flex-1">
            <Text className="font-bold text-lg text-[#172117]">
              {item.companyName || t('common.cleanCity')}
            </Text>
            <Text className="mt-1 text-sm text-[#7A847A]">{t('clients.reward')}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#A3ADA1" />
        </View>

        <View className="mt-5 flex-row items-center justify-between rounded-2xl bg-[#F1F7EE] px-4 py-3">
          <View className="flex-row items-center">
            <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-[#DDEDD5]">
              <Feather name="percent" size={15} color="#477B32" />
            </View>
            <Text className="text-sm font-medium text-[#526052]">{t('clients.discount')}</Text>
          </View>
          <Text className="font-bold text-[#477B32]">
            {typeof item.discountPerPoint === 'number'
              ? `${item.discountPerPoint.toFixed(2)} din`
              : t('clients.undefined')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F9F5]">
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={renderClient}
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadClients(true)}
            tintColor="#0A378B"
          />
        }
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="font-bold text-3xl text-[#172117]">{t('clients.title')}</Text>
            <Text className="mt-2 text-base leading-6 text-[#707B70]">{t('clients.subtitle')}</Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center rounded-[24px] border border-dashed border-[#CBD5C8] bg-white px-6 py-10">
            <Feather
              name={error ? 'wifi-off' : loading ? 'loader' : 'users'}
              size={28}
              color="#8B9688"
            />
            <Text className="mt-3 text-center font-bold text-[#344034]">
              {error
                ? t('clients.unavailable')
                : loading
                  ? t('clients.loading')
                  : t('clients.empty')}
            </Text>
            {error && (
              <Text onPress={() => loadClients()} className="mt-2 font-semibold text-[#0A378B]">
                {t('clients.retry')}
              </Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Clients;
