import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView>

      <FlatList 
        data={[{id:1}, {id:2}, {id:3}]}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.id}</Text>
          </View>
        )}

      />

    </SafeAreaView>
  )
}

export default Home