import { StyleSheet } from 'react-native'
import { colors, spacing, typography } from '@/theme'

export const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  title: {
    fontSize: 28,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.gray,
    textAlign: 'center'
  }
})
