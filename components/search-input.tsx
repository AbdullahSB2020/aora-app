import { View, Text, TextInput, Touchable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

export type FormFieldProps = {
    otherStyles?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    placeholder?: string;
}

const SearchInput = ({
  otherStyles,
  keyboardType,
  placeholder,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className="
            border-2 border-black-200 w-full h-16 mt-3 bg-black-100
            rounded-2xl items-center flex-row px-4
            focus:border-secondary-200 space-x-4
        "
    >
      <TextInput
        className="
            text-white text-base mt-1 font-pregular 
            flex-1 
        "
        placeholder="Search a Video Topic "
        placeholderTextColor={"#7B7B8B"}
      />

      <TouchableOpacity>
        <Image 
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;