import { Alert, FlatList, Image, StyleSheet, RefreshControl, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/custom-button'
import { getUserVideos, getVideos, logUserOut } from '@/lib/app-write'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import EmptyState from '@/components/empty-state'
import { icons } from '@/constants'
import VideoCard from '@/components/video-card'
import useAppwriteHook from '@/lib/use-app-write'
import { useGlobalContext } from '@/context/global-provider'
import InfoBox from '@/components/info-box'

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const {
    data: posts,
    refetch: refetchPosts,
  } = useAppwriteHook(() => getUserVideos(user.$id));

  const logout = async () => {
    await logUserOut();
    setIsLoggedIn(false);
    setUser({
      $id: "",
      username: "",
      email: "",
      accountId: "",
      avatar: "",
    });
    router.replace('/sign-in');
    //! what is the difference between router.replace and router.push?
  }


  const refetch = async () => {
    console.log('refetching')
    setRefreshing(true);
    refetchPosts();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            className="
              w-full justify-center items-center
              mt-6 mb-12 px-4
            "
          >
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View
              className="
                w-20 h-20 justify-center items-center
                rounded-lg border-2 border-secondary-100
              "
            >

              {user.avatar && <Image
                source={{ uri: user.avatar }}
                className="w-[95%] h-[95%] rounded-lg"
                resizeMode="contain"
              />}
            </View>

            <InfoBox title={user.username} subtitle="" containerStyles='mt-4' titleStyles='text-xl' />

            <View className="flex-row">
              <InfoBox title={posts.length.toString() || "0"}  subtitle="posts" titleStyles='text-xl' containerStyles="mx-5" />
              <InfoBox title="1.2K" subtitle="followers" titleStyles='text-xl' containerStyles="mx-5"/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video!"
          />
        )}

        refreshControl={<RefreshControl 
          refreshing={refreshing}
          onRefresh={refetch}
        />}
      />
    </SafeAreaView>
  );
}

export default Profile