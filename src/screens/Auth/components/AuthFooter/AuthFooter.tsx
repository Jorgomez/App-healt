import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { colors, spacing, typography } from '@/theme'

interface AuthFooterProps {
  text: string
  actionText: string
  onPress: () => void
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  text,
  actionText,
  onPress
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.actionText}>{actionText}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingBottom: spacing.lg
  },
  text: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    marginRight: spacing.xs
  },
  actionText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.bold
  }
})

export default AuthFooter
