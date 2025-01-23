// components/common/inputs/TextInput.tsx
import React from 'react'
import { TextInput as RNTextInput, StyleSheet } from 'react-native'

////  no listo
type TextInputProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  error?: string
}

export const TextInput = ({
  value,
  onChangeText,
  placeholder,
  error,
  ...props
}: TextInputProps) => {
  return (
    <RNTextInput
      style={[styles.input, error && styles.inputError]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  },
  inputError: {
    borderColor: 'red'
  }
})
