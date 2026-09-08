import { useState } from 'react';
import { FlatList, Image, Text, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

type Post = {
  id: string;
  title?: string;
  status?: string;
  description?: string;
  email?: string;
  image?: string;
  imageUrls?: string[];
  imagesUrls?: string[];
};

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageUrls = post.imageUrls?.length
    ? post.imageUrls
    : post.imagesUrls?.length
      ? post.imagesUrls
      : post.image
        ? [post.image]
        : [];
  const status = post.status || 'pending';
  const statusLabel = t(`post.${status}`, { defaultValue: status });
  const isDeclined = status === 'declined';
  const isPending = status === 'pending';
  const authorInitial = post.email?.charAt(0).toUpperCase() || 'C';

  return (
    <View className="mb-5 overflow-hidden rounded-[24px] border border-[#E5E8E3] bg-white shadow-sm">
      <View className="px-5 pb-4 pt-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#0A378B]">
              <Text className="font-bold text-white">{authorInitial}</Text>
            </View>
            <View>
              <Text className="font-bold text-[#172117]">{t('common.citizenReport')}</Text>
              <Text className="mt-0.5 text-xs text-[#7A847A]">{post.email || t('common.cleanCity')}</Text>
            </View>
          </View>
          <View
            className={`flex-row items-center rounded-full px-3 py-1.5 ${
              isDeclined ? 'bg-[#FDECEC]' : isPending ? 'bg-[#FFF7D6]' : 'bg-[#EEF7E9]'
            }`}>
            <View
              className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                isDeclined ? 'bg-[#D64545]' : isPending ? 'bg-[#D9A400]' : 'bg-[#5E9C42]'
              }`}
            />
            <Text
              className={`font-bold text-xs ${
                isDeclined ? 'text-[#B42318]' : isPending ? 'text-[#946C00]' : 'text-[#477B32]'
              }`}>
              {statusLabel}
            </Text>
          </View>
        </View>

        <Text className="mt-5 font-bold text-xl text-[#172117]">
          {post.title || t('post.defaultTitle')}
        </Text>

        {post.description && (
          <Text className="mt-2 leading-5 text-[#667066]">{post.description}</Text>
        )}
      </View>

      {imageUrls.length > 0 && (
        <View className="relative overflow-hidden">
          <FlatList
            data={imageUrls}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(url, index) => `${url}-${index}`}
            onMomentumScrollEnd={(event) => {
              setActiveImageIndex(Math.round(event.nativeEvent.contentOffset.x / (width - 32)));
            }}
            renderItem={({ item: imageUrl }) => (
              <Image source={{ uri: imageUrl }} style={{ width, height: 220 }} resizeMode="cover" />
            )}
          />

          <View className="absolute right-4 top-4 flex-row items-center rounded-full bg-black/55 px-2.5 py-1.5">
            <Feather name="image" size={13} color="white" />
            <Text className="ml-1 font-bold text-xs text-white">
              {activeImageIndex + 1}/{imageUrls.length}
            </Text>
          </View>

          {imageUrls.length > 1 && (
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-1.5">
              {imageUrls.map((imageUrl, index) => (
                <View
                  key={`${imageUrl}-dot-${index}`}
                  className={`h-1.5 rounded-full ${
                    index === activeImageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {imageUrls.length === 0 && (
        <View className="mx-5 mb-5 h-20 items-center justify-center rounded-2xl bg-[#F3F6F1]">
          <Feather name="camera-off" size={18} color="#8B9688" />
          <Text className="mt-1 text-xs text-[#8B9688]">{t('post.noPhotos')}</Text>
        </View>
      )}
    </View>
  );
};

export default PostCard;
