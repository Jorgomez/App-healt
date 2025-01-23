import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { AppNavigator } from './src/navigation'
import { Provider } from 'react-redux'
import { store } from '@/store/config/store'

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
        <StatusBar style='auto' />
      </Provider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
