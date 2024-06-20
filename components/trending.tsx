import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'

import * as Animatable from 'react-native-animatable'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '@/constants';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

export type TrendingItemProps = {
  activeItem: any;
  item: any;
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false)
  return (
    <Animatable.View
      className='mt-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >

      { play ?
      <Video 
        source={{ uri: `${item.video}` }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status) => {
          // if(status.didJustFinish){
            setPlay(false)
          // }
        }}
        onError={(error) => {
        }}
        className='w-52 h-72 rounded-[35px] my-5 bg-white/10'
      />
      :
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setPlay(true)}
        className='relative justify-center items-center m-2'
      >
        <ImageBackground 
          source={{
            uri: item.thumpnail
          }}
          className='
            w-52 h-72 rounded-[35px] my-5 overflow-hidden
            shadow-lg shadow-black/40
          '
          resizeMode="cover"
        />

        <Image 
          source={icons.play}
          className='w-12 h-12 absolute'
          resizeMode='contain'
        />

      </TouchableOpacity>
    }

    </Animatable.View>
  )
};

export type TrendingProps = {
  posts: any[];
};

const Trending = ({posts}: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1])
  const viewableItemsChanged = ({viewableItems}:{viewableItems: any}) => {
    if(viewableItems.length > 0){
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
        data= {posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => (
          <TrendingItem
            activeItem={activeItem}
            item={item}
          />
        )}
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        contentOffset={{x: 170, y: 0}}
        showsHorizontalScrollIndicator={false}
    />
  )
}

export default Trending