import { StyleSheet, Platform } from 'react-native'
import { colors } from '@/theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  keyboardView: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  container: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 20
  }
})
