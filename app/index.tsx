import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white" >

      <Text 
        className='text-3xl text-blue-500 font-pblack'
        >
            Root Layout Test
        </Text>
      <Link href='/home' className='text-blue-500'>Home</Link>
    </View>
  )
}

export default RootLayout
