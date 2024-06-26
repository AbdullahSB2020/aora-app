import { View, Text, Image } from 'react-native'
import React from 'react'

import { images } from '@/constants';
import CustomButton from './custom-button';
import { router } from 'expo-router';

export type EmptyStateProps = {
  title: string;
  subtitle: string;
}

const EmptyState = ({
  title,
  subtitle,
}: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-white mt-2">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton
        title='Create Video'
        containerStyle='w-full my-5'
        onPress={() => router.push("/create")}
      />
    </View>
  );
}

export default EmptyState