import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native'
import { colors, spacing, typography } from '@/theme'
import { BaseInputProps } from '@/types/components/inputs'

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle, error && styles.inputError]}
        placeholderTextColor={colors.gray}
        {...inputProps}
      />
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: typography.weights.medium
  },
  input: {
    backgroundColor: '#f7f8f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.text
  },
  inputError: {
    borderColor: colors.error
  },
  error: {
    color: colors.error,
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs
  }
})

export default BaseInput
