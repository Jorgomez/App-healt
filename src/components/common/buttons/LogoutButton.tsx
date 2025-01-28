import React from 'react'
import { TouchableOpacity, StyleSheet, Text, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch } from '@/store/hooks'
import { logout } from '@/features/auth/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'

interface WebProps {
  onClick?: () => void
  role?: 'button'
  tabIndex?: number
  style?: any // Para permitir estilos web específicos
}

const LogoutButton = () => {
  const dispatch = useAppDispatch()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const handleLogout = async () => {
    try {
      console.log('🔴 Starting logout process...')

      // 1. Navegar primero a Auth
      navigation.navigate('Auth')
      console.log('🔴 Navigated to Auth')

      // 2. Limpiar AsyncStorage
      await AsyncStorage.multiRemove([
        'persist:root',
        'firebase:authUser:AIzaSyCiGQTneHCHroNfsk0AbTYmHEUrRoUbvz8:[DEFAULT]'
      ])
      console.log('🔴 AsyncStorage cleared')

      // 3. Dispatch logout action al final
      dispatch(logout())
      console.log('🔴 Logout action dispatched')
    } catch (error) {
      console.error('🔴 Error during logout:', error)
    }
  }

  // Propiedades específicas para web
  const webProps: WebProps = Platform.select({
    web: {
      onClick: handleLogout,
      role: 'button',
      tabIndex: 0,
      style: { cursor: 'pointer' } // Agregar cursor pointer para web
    },
    default: {}
  }) as WebProps

  return (
    <TouchableOpacity
      style={[styles.button, styles.menuItem]}
      onPress={handleLogout}
      {...webProps}
      accessible={true}
      accessibilityRole='button'
      accessibilityLabel='Logout button'
    >
      <Text style={styles.menuText}>Logout</Text>
      <Ionicons name='log-out-outline' size={24} color='#FF3B30' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        position: 'relative',
        zIndex: 999
      }
    })
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'space-between',
    ...Platform.select({
      web: {
        position: 'relative',
        zIndex: 999
      }
    })
  },
  menuText: {
    color: '#FF3B30',
    fontSize: 16
  }
})

export default LogoutButton
