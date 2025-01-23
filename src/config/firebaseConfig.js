import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider
} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCiGQTneHCHroNfsk0AbTYmHEUrRoUbvz8',
  authDomain: 'chat-app-8d96c.firebaseapp.com',
  projectId: 'chat-app-8d96c',
  storageBucket: 'chat-app-8d96c.firebasestorage.app',
  messagingSenderId: '268875241505',
  appId: '1:268875241505:web:685079006bc8b40d7eeb60'
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const provider = new GoogleAuthProvider()

export const IOS_CLIENT_ID =
  '759838588179-uqcsmo1jlc66neckvmmlgdhntvgbcogg.apps.googleusercontent.com'
