import { useAppDispatch } from '@/store/hooks'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Platform } from 'react-native'
import { auth } from '@/config/firebaseConfig'
import { RootStackParamList } from '@/navigation/types'
import { twitterAuth } from '../thunks/twitterAuthThunks'
import { useEffect, useState } from 'react'
import {
  signInWithPopup,
  TwitterAuthProvider,
  UserCredential,
  signInWithCredential
} from 'firebase/auth'
import {
  useAuthRequest,
  makeRedirectUri,
  ResponseType,
  AuthSessionResult
} from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

const TWITTER_CLIENT_ID = 'NjNvNlA5V1hoeWdPc0doSjMzVzk6MTpjaQ'
const APP_SCHEME = 'com.queryhealth.app'

const discovery = {
  authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
  tokenEndpoint: 'https://api.twitter.com/2/oauth2/token',
  revocationEndpoint: 'https://twitter.com/i/oauth2/revoke'
}

export const useTwitterAuth = () => {
  const dispatch = useAppDispatch()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: TWITTER_CLIENT_ID,
      redirectUri: makeRedirectUri({
        scheme: APP_SCHEME,
        path: 'twitter-auth'
      }),
      scopes: ['tweet.read'], // Reducido a scope mínimo
      responseType: ResponseType.Code,
      usePKCE: true
    },
    discovery
  )

  const getAccessToken = async (code: string, codeVerifier: string) => {
    try {
      console.log('Getting access token with code:', code)
      console.log('Code verifier:', codeVerifier)

      const params = new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: TWITTER_CLIENT_ID,
        redirect_uri: makeRedirectUri({
          scheme: APP_SCHEME,
          path: 'twitter-auth'
        }),
        code_verifier: codeVerifier
      })

      console.log('Token request params:', params.toString())

      const response = await fetch('https://api.twitter.com/2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      })

      console.log('Token response status:', response.status)
      const responseData = await response.json()
      console.log('Token response data:', responseData)

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to get access token')
      }

      return responseData
    } catch (error) {
      console.error('Error getting access token:', error)
      throw error
    }
  }

  useEffect(() => {
    const handleAuthResponse = async () => {
      if (response?.type === 'success' && response.params.code) {
        console.log('Auth success, code received:', response.params.code)
        setIsLoading(true)

        try {
          const tokenResponse = await getAccessToken(
            response.params.code,
            request?.codeVerifier || ''
          )

          console.log('Successfully got token response')

          // Para Firebase, necesitamos un token de acceso y un secreto
          const credential = TwitterAuthProvider.credential(
            tokenResponse.access_token,
            '' // Twitter OAuth 2.0 no proporciona oauth_token_secret
          )

          console.log('Created Firebase credential')

          const userCredential = await signInWithCredential(auth, credential)
          console.log('Firebase auth successful:', userCredential.user.uid)

          await dispatch(twitterAuth(tokenResponse.access_token, ''))

          setError(null)
          navigation.navigate('Home')
        } catch (error) {
          console.error('Detailed auth error:', error)
          setError(
            error instanceof Error
              ? error.message
              : 'Error de autenticación desconocido'
          )
        } finally {
          setIsLoading(false)
        }
      } else if (response?.type === 'error') {
        console.error('OAuth Error Response:', response)
        setError(
          `Error de autenticación: ${
            response.error?.message || 'Error desconocido'
          }`
        )
      }
    }

    handleAuthResponse()
  }, [response])

  const handleTwitterAuth = async () => {
    setIsLoading(true)
    try {
      if (Platform.OS === 'web') {
        const provider = new TwitterAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const credential = TwitterAuthProvider.credentialFromResult(result)

        if (!credential?.accessToken) {
          throw new Error('No se recibieron credenciales de Twitter')
        }

        await dispatch(twitterAuth(credential.accessToken, ''))
        navigation.navigate('Home')
      } else {
        console.log('Iniciando autenticación móvil...')

        if (!request) {
          throw new Error('Objeto request no está listo')
        }

        const result = await promptAsync()
        console.log('Resultado de autenticación:', result)

        if (result.type !== 'success') {
          throw new Error(`La autorización falló: ${result.type}`)
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido'
      console.error('Error de autenticación:', error)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleTwitterAuth, isLoading, error }
}
