import { Platform } from 'react-native'

// URL dinámica según plataforma
export const SOCKET_URL = Platform.select({
  android: 'http://10.0.2.2:3001',
  ios: 'http://localhost:3001',
  web: 'http://localhost:3001',
  default: 'http://localhost:3001'
})

// Para debug
console.log('🔌 Socket URL:', SOCKET_URL)
