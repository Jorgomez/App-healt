import React from 'react'
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, typography } from '@/theme'
import {
  PrimaryButtonProps,
  SocialButtonProps
} from '@/types/components/buttons'

const PrimaryButton: React.FC<PrimaryButtonProps | SocialButtonProps> = ({
  onPress,
  title,
  disabled,
  loading,
  icon,
  style,
  textStyle
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      { opacity: pressed ? 0.5 : 1 },
      disabled && styles.disabled,
      style
    ]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color='white' />
    ) : (
      <>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {icon && (
          <Ionicons name={icon} size={24} color='white' style={styles.icon} />
        )}
      </>
    )}
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  disabled: {
    opacity: 0.5
  },
  text: {
    color: colors.background,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginRight: 10
  },
  icon: {
    marginLeft: 10
  }
})

export default PrimaryButton
