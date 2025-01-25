import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Welcome: undefined
  Auth: undefined
  Home: undefined
}

export type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Welcome'
>
export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
