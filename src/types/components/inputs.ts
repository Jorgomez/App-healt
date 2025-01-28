import { TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { Control, FieldValues, Path } from 'react-hook-form'

// Base Input Types
export interface BaseInputProps extends TextInputProps {
  label?: string
  error?: string
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  inputStyle?: StyleProp<TextStyle>
  errorStyle?: StyleProp<TextStyle>
}

// Form Input Types
export interface FormInputProps<T extends FieldValues>
  extends Omit<BaseInputProps, 'value' | 'onChangeText'> {
  control: Control<T>
  name: Path<T>
  rules?: object
}

// Chat Input Types
export interface ChatInputProps
  extends Omit<BaseInputProps, 'value' | 'onChangeText'> {
  onSend: (message: string) => void
  placeholder?: string
}
