import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants';
import CustomButton from '@/components/custom-button';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/global-provider';

const RootLayout = () => {
  const {
    isLoading,
    isLoggedIn,
  } = useGlobalContext();
  
  if(!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  }
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <View className="w-full min-h-[85vh] justify-center items-center px-4">

            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />

            <Image
              source={images.cards}
              className="w-[380px] h-[300px]"
              resizeMode='contain'
            />

            <View
              className="relative mt-5"
            >

              <Text
                className='text-3xl font-bold text-white text-center'
              >
                Discover Endless Possibilities with <Text className='text-secondary-200'>Aora</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode='contain'
              />
            </View>

            <Text
              className='text-sm font-pregular text-gray-200 mt-8 text-center'
            >
              Where creativity meets innovation:
              embark on a journey of limitless possibilities with Aura.
            </Text>

            <CustomButton
              title='Continue with email'
              containerStyle='w-full mt-8'
              onPress={() => router.push('sign-in')}
            />

            <StatusBar backgroundColor='#161622' style='light' hidden={false} />

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default RootLayout
