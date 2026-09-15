import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PostCard from '~/components/PostCard';
import { useTranslation } from 'react-i18next';
import PostsTabs from '~/components/PostsTabs';
const Home = () => {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'accepted' | 'declined'>(
    'pending'
  );
  const [posts, setPosts] = useState<any[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);

  useEffect(() => {
    getMyPosts();
  }, []);

  useEffect(() => {
    setVisiblePosts(posts.filter((post) => post.status === selectedStatus));
  }, [posts, selectedStatus]);

  const getMyPosts = async () => {
    try {
      const user = getAuth().currentUser;

      if (!user?.email) return;

      const snapshot = await firestore()
        .collection('posts')
        .where('creator', '==', user.email)
        .get();

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    } catch (error) {
      console.error('Error getting posts:', error);
    }
  };

  return (
    <SafeAreaView className="w-full flex-1 bg-white">
      <View
        className="absolute left-0 right-0 top-0 z-20 bg-white px-4 pb-3 pt-2"
        style={{
          zIndex: 20,
          elevation: 20,
        }}>
        <PostsTabs
          posts={posts}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </View>
      {/* Posts filter by status */}
      <FlatList
        data={visiblePosts}
        keyExtractor={(item) => item.id}
        className="w-full"
        contentContainerStyle={{ paddingTop: 76, paddingHorizontal: 16, paddingBottom: 140 }}
        ListEmptyComponent={
          <Text className="mt-10 text-center font-regular text-gray-500">{t('reports.empty')}</Text>
        }
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </SafeAreaView>
  );
};

export default Home;
