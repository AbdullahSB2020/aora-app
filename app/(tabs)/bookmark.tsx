import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '@/components/custom-button'

const BookMark = () => {
  return (
    <View>
      <CustomButton 
        title='BookMark'
        containerStyle='my-[200px]'
        isLoading={true}
      />
    </View>
  )
}

export default BookMark