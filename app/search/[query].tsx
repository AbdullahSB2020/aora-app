import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { searchVideos } from '@/lib/app-write';
import EmptyState from '@/components/empty-state';
import { images } from '@/constants';
import SearchInput from '@/components/search-input';
import VideoCard from '@/components/video-card';
import useAppwriteHook from '@/lib/use-app-write';

const Search = () => {
  const { query } = useLocalSearchParams();
  
  const {
    data: foundVideos,
    refetch
  } = useAppwriteHook(() => searchVideos(query as string));

  useEffect(() => {
    
    refetch();

  }, [query])
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={foundVideos ?? []}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
          )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Search results</Text>
                <Text className='text-2xl font-psemibold text-white'>{query}</Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
                </View>
            </View>

            <SearchInput initialQuery={query as string} />
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle="Try searching for another video topic..."
          />
        )}
    
      />
    </SafeAreaView>
  );
}

export default Search