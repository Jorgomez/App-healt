import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterData } from '@/features/auth/types/auth'
import { colors, spacing, typography } from '@/theme'
import { RootState } from '@/store/config/store'
import { signUpSchema } from '@/validations/auth'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import { useRegisterForm } from '@/features/auth/hooks/useAuth'
import FormInput from '@/components/common/inputs/FormInput'

const RegisterForm = () => {
  const onSubmit = useRegisterForm()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const { control, handleSubmit } = useForm<RegisterData>({
    resolver: yupResolver(signUpSchema)
  })

  return (
    <View style={styles.formContainer}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FormInput
        control={control}
        name='username'
        label='Username'
        placeholder='Enter your username'
        autoCapitalize='none'
        returnKeyType='next'
        blurOnSubmit={false}
        editable={!isLoading}
      />

      <FormInput
        control={control}
        name='email'
        label='Email'
        placeholder='Enter your email'
        keyboardType='email-address'
        autoCapitalize='none'
        returnKeyType='next'
        blurOnSubmit={false}
        editable={!isLoading}
      />

      <FormInput
        control={control}
        name='password'
        label='Password'
        placeholder='Enter your password'
        secureTextEntry
        autoCapitalize='none'
        returnKeyType='done'
        onSubmitEditing={handleSubmit(onSubmit)}
        editable={!isLoading}
      />

      <PrimaryButton
        title='Sign Up'
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        loading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: spacing.lg,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.sm,
    fontSize: typography.sizes.xs
  }
})

export default RegisterForm
