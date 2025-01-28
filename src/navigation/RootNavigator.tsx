import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/config/store'
import HomeScreen from '@/screens/Home'
import AuthScreen from '@/screens/Auth/AuthScreen'
import ChatScreen from '@/screens/Chat/screens/ChatScreen'
import SelectionScreen from '@/screens/Chat/screens/SelectionScreen'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {!isAuthenticated ? (
        <Stack.Screen name='Auth' component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='ChatSelection' component={SelectionScreen} />
          <Stack.Screen name='Chat' component={ChatScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
