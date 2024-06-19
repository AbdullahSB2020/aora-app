import { View, Text, FlatList } from 'react-native'
import React from 'react'

export type TrendingProps = {
    posts: any[]
}

const Trending = ({posts}: TrendingProps) => {
  return (
    <FlatList
        data= {posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View>
                <Text className='text-white text-3xl'>{item.id}</Text>
            </View>
        )}
        horizontal
    />
  )
}

export default Trending