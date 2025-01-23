import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import {
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential
} from 'firebase/auth'
import {
  ANDROID_CLIENT_ID,
  auth,
  IOS_CLIENT_ID,
  WEB_CLIENT_ID
} from '@/config/firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'

WebBrowser.maybeCompleteAuthSession()

type GoogleSignUpButtonNavigationProp =
  NativeStackNavigationProp<RootStackParamList>

const GoogleSignUpButton: React.FC = () => {
  const navigation = useNavigation<GoogleSignUpButtonNavigationProp>()

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)

      signInWithCredential(auth, credential)
        .then(async (userCredential: UserCredential) => {
          try {
            console.log('Registro exitoso', userCredential.user)
            navigation.navigate('Home')
          } catch (error: any) {
            console.error('Error en registro', error)
            if (error.code === 'auth/invalid-credential') {
              console.error('Credenciales inválidas')
            } else if (error.code === 'auth/network-request-failed') {
              console.error('Error de red')
            } else {
              console.error('Error desconocido')
            }
          }
        })
        .catch((error: Error) => {
          console.error('Error en registro', error)
        })
    } else if (response?.type === 'error') {
      console.error('Authentication error', response.error)
      alert('Error de autenticación. Por favor, intenta nuevamente.')
    }
  }, [response, navigation])

  return (
    <TouchableOpacity
      style={styles.googleButton}
      onPress={() => promptAsync()}
      disabled={!request}
    >
      <Text style={styles.googleButtonText}>
        {!request ? 'Cargando...' : 'Continuar con Google'}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  googleButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600'
  }
})

export default GoogleSignUpButton
