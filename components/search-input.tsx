import { View, Text, TextInput, Touchable, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { router } from 'expo-router';
import { useLocalSearchParams, usePathname} from 'expo-router';

export type FormFieldProps = {
  initialQuery?: string;
}

const SearchInput = ({
  initialQuery,
}: FormFieldProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '')

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
        value={query}
        placeholder="Search a Video Topic "
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(text) => setQuery(text)}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={
          () => {
            if(!query){
              return Alert.alert('No Query','Please enter a search query')
            }

            if(pathname.startsWith('/search')){
              return router.setParams({query})
            } else{
              return router.push(`/search/${query}`)
            }
          }
        }
      >
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