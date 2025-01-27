import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginData } from '@/features/auth/types/auth'
import { colors, spacing, typography } from '@/theme'
import { RootState } from '@/store/config/store'
import { loginSchema } from '@/validations/auth'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import { useLoginForm } from '@/features/auth/hooks/useAuth'

const LoginForm = () => {
  const onSumbit = useLoginForm()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema)
  })

  return (
    <View style={styles.formContainer}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Enter your email'
                onChangeText={onChange}
                value={value}
                keyboardType='email-address'
                autoCapitalize='none'
                editable={!isLoading}
                textContentType='emailAddress'
                autoComplete='email'
                clearButtonMode='while-editing'
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Enter your password'
                onChangeText={onChange}
                value={value}
                secureTextEntry
                editable={!isLoading}
                autoCapitalize='none'
                textContentType='password'
                autoComplete='password'
                clearButtonMode='while-editing'
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <PrimaryButton
        title='Sign In'
        onPress={handleSubmit(onSumbit)}
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
  inputGroup: {
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
    padding: Platform.OS === 'ios' ? 16 : spacing.md,
    marginBottom: spacing.xs,
    fontSize: typography.sizes.md,
    color: colors.text
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.sm,
    fontSize: typography.sizes.xs
  }
})

export default LoginForm
