import { useAppDispatch } from '@/store/hooks'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as Google from 'expo-auth-session/providers/google'
import { Platform } from 'react-native'
import {
  auth,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  WEB_CLIENT_ID
} from '@/config/firebaseConfig'
import { RootStackParamList } from '@/navigation/types'
import { googleAuth } from '../thunks/googleAuthThunks'
import { useEffect, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export const useGoogleAuth = () => {
  const dispatch = useAppDispatch()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Configuración para mobile
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    scopes: ['openid', 'profile', 'email']
  })

  // Manejo de respuesta mobile
  useEffect(() => {
    if (
      Platform.OS !== 'web' &&
      response?.type === 'success' &&
      response.params?.id_token
    ) {
      setIsLoading(true)
      dispatch(googleAuth(response.params.id_token))
        .then(() => {
          setError(null)
          navigation.navigate('Home')
        })
        .catch((error) => {
          setError('Error de autenticación: ' + error.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [response])

  // Manejo de autenticación (web + mobile)
  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      if (Platform.OS === 'web') {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result)

        if (!credential?.idToken) {
          throw new Error('No ID token received from Google')
        }

        await dispatch(googleAuth(credential.idToken))
        navigation.navigate('Home')
      } else {
        await promptAsync()
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleGoogleAuth, isLoading, error }
}
