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
import { auth, IOS_CLIENT_ID } from '@/config/firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types' // Ajusta la ruta de importación según tu estructura de archivos

WebBrowser.maybeCompleteAuthSession()

type GoogleSignUpButtonNavigationProp =
  NativeStackNavigationProp<RootStackParamList>

const GoogleSignUpButton: React.FC = () => {
  const navigation = useNavigation<GoogleSignUpButtonNavigationProp>()

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'com.queryhealth.app'
  })

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    redirectUri
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)

      signInWithCredential(auth, credential)
        .then((userCredential: UserCredential) => {
          console.log('Registro exitoso', userCredential.user)
          navigation.navigate('Home')
        })
        .catch((error: Error) => {
          console.error('Error en registro', error)
        })
    } else if (response?.type === 'error') {
      console.error('Authentication error', response.error)
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
