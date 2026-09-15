import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

const PostsTabs = ({ posts, setSelectedStatus, selectedStatus }) => {
  const { t } = useTranslation();
  const statusTabs = [
    { value: 'pending' as const, label: t('reports.pending') },
    { value: 'accepted' as const, label: t('reports.accepted') },
    { value: 'declined' as const, label: t('reports.declined') },
  ];
  return (
    <View className="w-full flex-row rounded-full bg-[#EEF0F2] p-1">
      {statusTabs.map((tab) => {
        const postCount = posts.filter((post) => post.status === tab.value).length;

        return (
          <Pressable
            key={tab.value}
            onPress={() => setSelectedStatus(tab.value)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 8,
              paddingVertical: 12,
              borderRadius: 999,
              backgroundColor: tab.value === selectedStatus ? '#000000' : 'transparent',
              ...(tab.value === selectedStatus
                ? {
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.12,
                    shadowRadius: 4,
                    elevation: 2,
                  }
                : {}),
            }}>
            <View className="flex-row items-center">
              <Text
                className="font-regular"
                style={{
                  color: tab.value === selectedStatus ? '#FFFFFF' : '#667085',
                  fontWeight: '600',
                  fontSize: 12,
                }}>
                {tab.label}
              </Text>
              <View
                style={{
                  marginLeft: 6,
                  minWidth: 22,
                  alignItems: 'center',
                  borderRadius: 999,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  backgroundColor: tab.value === selectedStatus ? '#FFFFFF' : '#D9DEE5',
                }}>
                <Text
                  className="font-regular"
                  style={{
                    color: tab.value === selectedStatus ? '#000000' : '#667085',
                    fontSize: 12,
                    fontWeight: '700',
                  }}>
                  {postCount}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default PostsTabs;
