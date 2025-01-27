import { ViewStyle, TextStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export interface BaseButtonProps {
  onPress: () => void
  title: string
  disabled?: boolean
  loading?: boolean
  icon?: keyof typeof Ionicons.glyphMap
  style?: ViewStyle
  textStyle?: TextStyle
}

export interface PrimaryButtonProps extends BaseButtonProps {}
export interface SecondaryButtonProps extends BaseButtonProps {}

export interface SocialButtonProps extends BaseButtonProps {
  provider: 'google' | 'facebook' | 'twitter'
}
