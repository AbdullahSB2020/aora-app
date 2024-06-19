import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
type CustomButtonProps = {
    title: string;
    containerStyle?: string;
    onPress?: () => void;
    textStyles?: string;
    isLoading?: boolean;
}
const CustomButton = ({
    title,
    containerStyle,
    onPress,
    textStyles,
    isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`
            bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center 
            ${containerStyle}
            ${isLoading ? "bg-opacity-50" : ""}
        `}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text
        className={`
            text-primary text-lg font-psemibold
            ${textStyles}
        `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton