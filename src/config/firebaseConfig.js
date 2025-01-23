import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider
} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAPgNvele7W6umyy56Ytw5iBZ5Py_nBZi8',
  authDomain: 'chat-app-def.firebaseapp.com',
  projectId: 'chat-app-def',
  storageBucket: 'chat-app-def.firebasestorage.app',
  messagingSenderId: '454771600166',
  appId: '1:454771600166:web:b422f0678964cc102eefe7'
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const provider = new GoogleAuthProvider()

export const IOS_CLIENT_ID =
  '915431051466-k771sp5h18sms5rpes4o7f8lgtt2h770.apps.googleusercontent.com'
export const ANDROID_CLIENT_ID =
  '915431051466-3dsladvei1ddfrh5bq1cmomdihaqit62.apps.googleusercontent.com'
export const WEB_CLIENT_ID = ''
