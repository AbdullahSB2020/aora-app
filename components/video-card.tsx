import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

export type VideoCardProps = {
  video: any;
};

const VideoCard = ({
  video: {
    title,
    prompt,
    thumpnail,
    video,
    creators: { username, avatar },
  },
}: VideoCardProps) => {
    const [play, setPlay] = useState(false);
  return (

    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View
            className="w-[46px] h-[46px] rounded-lg border border-secondary-200 
                justify-center items-center p-0.5"
          >
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View>
          {/* video view */}
          <Image source={icons.menu} className="w-4 h-4" resizeMode="contain" />
        </View>
      </View>

      { play ? 
      <Text className="text-white">
        Video Playing...
      </Text>
      : <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setPlay(true)}
        className="
                w-full h-60 rounded-lg mt-3
                relative justify-center items-center
            "
      >
        <Image
          source={{ uri: thumpnail }}
          className="w-full h-full rounded-lg mt-3"
          resizeMode="cover"
        />
        <Image
          source={icons.play}
          className="w-12 h-12 absolute"
          resizeMode="contain"
        />
      </TouchableOpacity>}
    </View>
  );
};

export default VideoCard;
