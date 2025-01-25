import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { AuthScreenProps } from '@/navigation/types'
import { setAuthMode } from '@/features/auth/slices/authSlice'
import { RootState } from '@/store/config/store'
import { useAppDispatch } from '@/store/hooks'

import RegisterForm from './components/RegisterForm/RegisterForm'
import AuthHeader from './components/AuthHeader/AuthHeader'

import { styles } from './AuthScreen.styles'
import LoginForm from './components/LoginForm/LoginForm'
import AuthFooter from './components/AuthFooter/AuthFooter'

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const authMode = useSelector((state: RootState) => state.auth.mode)

  const toggleAuthMode = () => {
    dispatch(setAuthMode(authMode === 'login' ? 'register' : 'login'))
  }

  return (
    <View style={styles.container}>
      <AuthHeader title={authMode === 'login' ? 'Sign In' : 'Sign Up'} />

      {authMode === 'login' ? <LoginForm /> : <RegisterForm />}

      <AuthFooter
        text={
          authMode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'
        }
        actionText={authMode === 'login' ? 'Sign Up' : 'Sign In'}
        onPress={toggleAuthMode}
      />
    </View>
  )
}

export default AuthScreen
