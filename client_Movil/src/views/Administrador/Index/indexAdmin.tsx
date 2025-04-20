import React from 'react'
import { View, Text, Button } from 'react-native'

interface HomeScreenProps{
  onLogout: () => Promise<void>;
  navigation:any;
}
export default function IndexAdmin() {
  return (
    <View>
      <Text>Index</Text>
      <Button title='Cerrar Sesión' onPress={handleLogoutPress}></Button>
    </View>

  )
}

