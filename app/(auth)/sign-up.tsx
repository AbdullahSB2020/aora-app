import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/form-field'
import CustomButton from '@/components/custom-button'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/app-write'
import { useGlobalContext } from '@/context/global-provider'

const SignUp = () => {
  
  const {
    setUser,
    setIsLoggedIn
  } = useGlobalContext();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if( !form.email || !form.password || !form.username ) 
      return Alert.alert("Error", "Please fill in all fields")

    if (isSubmitting) 
      return Alert.alert("Error", "Please wait while we process your request")

    setIsSubmitting(true)

    try {
      const createdUser = await createUser(
        form.email,
        form.password,
        form.username
      );

      setIsLoggedIn(true);
      setUser(createdUser);

      setForm({
        username: '',
        email: '',
        password: ''
      });
      router.replace("/home");

    } catch(error){
      console.log(error)
      Alert.alert("Error", "An error occurred while creating user")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] justify-center px-4 my-6'>

          <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />
          <Text className='text-2xl text-white font-psemibold mt-10'>Sign up to Aora</Text>
          
          <FormField
            title="Username"
            value={form.username}
            handleTextChange={(username) => setForm({ ...form, username })}
            otherStyles='mt-7'
            keyboardType='default'
          />

          <FormField
            title="Email"
            value={form.email}
            handleTextChange={(email) => setForm({ ...form, email })}
            otherStyles='mt-3'
            keyboardType='email-address'
          />

          <FormField
            title="Password"
            value={form.password}
            handleTextChange={(password) => setForm({ ...form, password })}
            otherStyles='mt-3'
            keyboardType='default'
          />

          <CustomButton
            title='Sign Up'
            containerStyle='w-full mt-10'
            onPress={submit}
            isLoading={isSubmitting}

          />

          <View
            className='flex-row justify-center items-center pt-5 gap-2'
          >
            <Text
              className='text-gray-100 text-sm font-pregular'
            >
              Have an account already?
            </Text>
            <Link
              href='/sign-in'
              className='text-secondary-200 text-sm font-psemibold'
            >
              Sign In
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp