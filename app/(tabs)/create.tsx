
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ResizeMode, Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker';

import { icons } from '@/constants'
import CustomButton from '@/components/custom-button'
import FormField from '@/components/form-field'
import { createVideo } from '@/lib/app-write';
import { useGlobalContext } from '@/context/global-provider';
import { router } from 'expo-router';

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState<{
    title: string,
    prompt: string,
    thumbnail: ImagePicker.ImagePickerAsset | undefined,
    video: ImagePicker.ImagePickerAsset | undefined,
  
  }>({
    title: '',
    prompt: '',
    thumbnail: undefined,
    video: undefined,
  });

  const openPicker = async (fileType: 'video' | 'image') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: fileType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if(result.assets && result.assets[0]){
      if(fileType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      } else if(fileType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      } else {
        Alert.alert('Invalid file type', "Please select a valid file type", [{ text: 'OK' }])
      }

    }

    console.log(JSON.stringify(result, null, 2));
  }
  const submit = async () => {
    if(!form.title || !form.prompt || !form.thumbnail || !form.video) {
      Alert.alert('Form missing', "Please fill all fields", [{ text: 'OK' }])
      return
    }

    setUploading(true);

    try {
      const createdVideo = await createVideo({
        ...form,
        userId: user?.$id
      });

      console.log(JSON.stringify(createdVideo, null, 2));
      Alert.alert('Success', "Video uploaded successfully", [{ text: 'OK' }])
      router.push("home");

    } catch(error){
      console.log("🚀 ~ getFilePreview ~ error:", JSON.stringify(error, null, 2))
      Alert.alert('Error', "An error occurred while uploading the video", [{ text: 'OK' }])
    } finally{
      setForm({
        title: '',
        prompt: '',
        thumbnail: undefined,
        video: undefined,
      });
      setUploading(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <View>

          <Text className='text-white text-lg font-psemibold'>Upload a video</Text>

           <FormField
            value={form.title}
            handleTextChange={(text) => setForm({ ...form, title: text })} 
            title='Video title'
            otherStyles='mt-4'
            placeholder='Your catchy title'
            textStyles='text-base'
           />
        </View>

        <View className='mt-4 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload a video
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('video')}
          >
            { form.video ? 
              <Video 
                source={{ uri: form.video.uri }}
                className='w-full h-60 rounded-2xl'
                resizeMode={ResizeMode.COVER}
                // useNativeControls
                // isLooping
              />
              :
              <View
                className='w-full h-40 bg-black-100 rounded-2xl justify-center items-center px-4'
              >
                <View
                  className='w-14 h-14 border border-dashed border-secondary-200 justify-center items-center'
                >

                  <Image 
                    source={icons.upload}
                    className='w-6 h-6'
                    resizeMode="contain"
                  />
                  
                </View> 
              </View>
            }
          </TouchableOpacity>
        </View>
        

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('image')}
          >
            { form.thumbnail ? 
              <Image 
                source={{ uri: form.thumbnail.uri }}
                className='w-full h-60 rounded-2xl'
                resizeMode="cover"
              />
              :
              <View
                className='
                  w-full h-16 bg-black-100 rounded-2xl justify-center items-center
                  px-4 flex-row'
              >
                <Image 
                  source={icons.upload}
                  className='w-6 h-6'
                  resizeMode="contain"
                />
                <Text className='text-white mx-3'>
                  choose a file
                </Text>
              </View>
            }
          </TouchableOpacity>
        </View>

        <FormField
          value={form.prompt}
          handleTextChange={(text) => setForm({ ...form, prompt: text })} 
          title='Video Prompt'
          otherStyles='mt-6'
          placeholder='Your video prompt'
          textStyles='text-base'
        />


        <CustomButton 
          title='Share The Video'
          onPress={submit}
          containerStyle='mt-6'
          isLoading={uploading}
        />
      </ScrollView>
        
    </SafeAreaView>
  )
}

export default Create