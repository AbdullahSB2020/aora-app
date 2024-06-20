import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const {
    data: posts,
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
              <InfoBox title={posts.length || 0}  subtitle="posts" titleStyles='text-xl' containerStyles="mx-5" />
              <InfoBox title="1.2K" subtitle="followers" titleStyles='text-xl' containerStyles="mx-5"/>
            </View>
          </View>
          // { things from me}
          // <View className="my-6 px-4 space-y-6">
          //   <View className='justify-center items-end'>
          //     <TouchableOpacity
          //       onPress={logout}
          //       activeOpacity={0.7}
          //     >
          //       <Image
          //         source={icons.logout}
          //         className='w-5 h-5'
          //         resizeMode='contain'
          //       />

          //     </TouchableOpacity>

          //   </View>
          //   <View className='justify-between items-center mb-6'>

          //     <View

          //       className='
          //         w-[80px] h-[80px] justify-center items-center flex-1
          //         rounded-lg border-2 border-secondary-100 p-0.5
          //     '>
          //       <Image
          //         source={{uri: user.avatar}}
          //         className='w-full h-full rounded-lg'
          //         resizeMode='contain'
          //       />

          //     </View>
          //     <View>
          //       <Text className='text-white text-2xl mt-4 font-pregular'>
          //         {user.username}
          //       </Text>
          //     </View>

          //     <View className='flex-row  '>
          //       <InfoBox
          //         title='3'
          //         subtitle="posts"
          //         additionalStyles='mr-4'
          //       />

          //       <InfoBox
          //         title='1.2K'
          //         subtitle="followers"
          //         additionalStyles='mr-4'

          //       />
          //     </View>
          //   </View>
          // </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video!"
          />
        )}
      />
    </SafeAreaView>
  );
}

export default Profile