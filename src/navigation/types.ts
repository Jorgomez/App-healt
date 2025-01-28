import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Auth: undefined
  ChatSelection: undefined
  Chat: {
    chatType: 'doctor' | 'ai' | 'patient'
    roomId: string
    isDoctor?: boolean
  }
  Home: undefined
}

export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
export type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>
export type ChatSelectionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChatSelection'
>
