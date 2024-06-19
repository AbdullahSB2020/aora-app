import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '@/components/custom-button'
import { logUserOut } from '@/lib/app-write'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const ProfileComponent = () => {

  const logUserOutFromDevice = async () => {
    
    try{
      await logUserOut();
      router.replace('/sign-in');
    } catch(error){
      console.log(error)
      Alert.alert("Error", "An error occurred while logging the user out")
    }

  }
  return (
    <SafeAreaView>
      <CustomButton 
        title='Sign Out'
        onPress={() => logUserOutFromDevice()}
      />
      <Text>Profile Component</Text>
    </SafeAreaView>
  )
}

export default ProfileComponent

const styles = StyleSheet.create({});