import React from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView
} from 'react-native'
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
import { OAuthProviders } from './components/OAuthButtons/OAuthButtons'

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const authMode = useSelector((state: RootState) => state.auth.mode)

  const toggleAuthMode = () => {
    dispatch(setAuthMode(authMode === 'login' ? 'register' : 'login'))
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.container}>
            <AuthHeader title={authMode === 'login' ? 'Sign In' : 'Sign Up'} />

            {authMode === 'login' ? <LoginForm /> : <RegisterForm />}

            <OAuthProviders />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AuthScreen
