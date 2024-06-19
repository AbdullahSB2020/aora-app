import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/form-field'
import CustomButton from '@/components/custom-button'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/app-write'
import { useGlobalContext } from '@/context/global-provider'

const SignIn = () => {
  const {
    setUser,
    setIsLoggedIn,
  } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if( !form.email || !form.password ) 
      return Alert.alert("Error", "Please fill in all fields")

    if (isSubmitting) 
      return Alert.alert("Error", "Please wait while we process your request")

    setIsSubmitting(true)

    try {
      const createdUser = await signIn(
        form.email,
        form.password,
      );
      console.log("🚀 ~ submit ~ createdUser:", createdUser)
      
      setIsLoggedIn(true);
      setUser(createdUser);

      setForm({
        email: '',
        password: ''
      });
      router.replace("/home");

    } catch(error){
      console.log(error)
      Alert.alert("Error", "An error occurred while logging the user in")
    } finally {
      setIsSubmitting(false)
      console.log("Sign in complete")
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
          <Text className='text-2xl text-white font-psemibold mt-10'>Log in to Aora</Text>
          
          <FormField
            title="Email"
            value={form.email}
            handleTextChange={(email) => setForm({ ...form, email })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title="Password"
            value={form.password}
            handleTextChange={(password) => setForm({ ...form, password })}
            otherStyles='mt-7'
            keyboardType='default'
          />

          <CustomButton
            title='Sign In'
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
              Don't have an account?
            </Text>
            <Link
              href='/sign-up'
              className='text-secondary-200 text-sm font-psemibold'
            >
              Sign Up
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn