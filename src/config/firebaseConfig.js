import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  TwitterAuthProvider
} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

const firebaseConfig = {
  apiKey: 'AIzaSyAPgNvele7W6umyy56Ytw5iBZ5Py_nBZi8',
  authDomain: 'chat-app-def.firebaseapp.com',
  projectId: 'chat-app-def',
  storageBucket: 'chat-app-def.firebasestorage.app',
  messagingSenderId: '454771600166',
  appId: '1:454771600166:web:b422f0678964cc102eefe7'
}

const app = initializeApp(firebaseConfig)
export const auth = Platform.OS === 'web' ? getAuth(app) : getAuth(app)

export const provider = new GoogleAuthProvider()
export const twitterProvider = new TwitterAuthProvider()

twitterProvider.setCustomParameters({
  oauth_consumer_key: 'NjNvNlA5V1hoeWdPc0doSjMzVzk6MTpjaQ',
  oauth_consumer_secret: 'x4IoBJQkNUYEewfy-EEBkC1oFAtJLNkwRoiHwESVgsGNhX7bgJ',
  redirect_uri: 'https://chat-app-def.firebaseapp.com/__/auth/handler',
  oauth_callback: 'https://chat-app-def.firebaseapp.com/__/auth/handler'
})

export const IOS_CLIENT_ID =
  '915431051466-k771sp5h18sms5rpes4o7f8lgtt2h770.apps.googleusercontent.com'
export const ANDROID_CLIENT_ID =
  '915431051466-3dsladvei1ddfrh5bq1cmomdihaqit62.apps.googleusercontent.com'
export const WEB_CLIENT_ID =
  '915431051466-0dbfjoukefteb8jda3v354be1ad2l0fn.apps.googleusercontent.com'

// export const auth = initializeAuth(app, {
//   persistence: Platform.OS === 'web' ? browserLocalPersistence : undefined
// })
// export const auth = initializeAuth(app)
// export const auth = initializeAuth(app, {
//   persistence: Platform.OS === 'web' ? browserLocalPersistence: getReactNativePersistence(AsyncStorage) // teniamos asi esta config
// })
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// })
