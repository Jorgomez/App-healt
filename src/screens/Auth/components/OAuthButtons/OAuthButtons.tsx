import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, spacing, typography } from '@/theme'
import { useGoogleAuth } from '@/features/auth/hooks/useGoogleAuth'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import { useTwitterAuth } from '@/features/auth/hooks/useTwitterAuth'

type ProviderName = 'Google' | 'Facebook' | 'Twitter'
type ProviderIcon = 'logo-google' | 'logo-facebook' | 'logo-twitter'

interface Provider {
  name: ProviderName
  icon: ProviderIcon
  onPress: () => void
}

// interface OAuthProvidersProps {
//   isLoading: boolean
// }

export const OAuthProviders = () => {
  const { handleGoogleAuth, isLoading } = useGoogleAuth()
  const { handleTwitterAuth } = useTwitterAuth()
  // const { handleTwitterAuth, isLoading: twitterLoading } = useTwitterAuth()

  const providers: Provider[] = [
    {
      name: 'Google',
      icon: 'logo-google',
      onPress: handleGoogleAuth
    },
    {
      name: 'Facebook',
      icon: 'logo-facebook',
      onPress: () => {} // Implement Facebook auth
    },
    {
      name: 'Twitter',
      icon: 'logo-twitter',
      onPress: handleTwitterAuth
      // Implement Twitter auth
    }
  ]

  return (
    <>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.providersContainer}>
        {providers.map((provider) => (
          <PrimaryButton
            key={provider.name}
            title={provider.name}
            provider={
              provider.name.toLowerCase() as 'google' | 'facebook' | 'twitter'
            }
            onPress={provider.onPress}
            disabled={isLoading}
            loading={isLoading}
            icon={provider.icon}
            style={styles.providerButton}
            textStyle={styles.providerButtonText}
          />
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0'
  },
  dividerText: {
    marginHorizontal: spacing.sm,
    color: colors.gray
  },
  providersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  providerButton: {
    textAlign: 'center',
    flex: 1,
    marginHorizontal: spacing.xs,
    height: '100%',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  providerButtonText: {
    fontSize: typography.sizes.xs
  }
})
