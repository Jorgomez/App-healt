import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Welcome: undefined
  SignUp: undefined
  SignIn: undefined
  Home: undefined
}

export type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Welcome'
>
export type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>
export type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
