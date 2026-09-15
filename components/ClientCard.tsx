import { View, Text, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
type Client = {
  id: string;
  companyName?: string;
  logoUrl?: string;
  discountPerPoint?: number;
};
const ClientCard = ({ item }: { item: Client }) => {
  const { t } = useTranslation();
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
export default ClientCard;
