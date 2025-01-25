import React from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { register } from '@/features/auth/thunks/authThunks'
import { RegisterData } from '@/features/auth/types/auth'
import { colors, spacing, typography } from '@/theme'
import { RootState } from '@/store/config/store'
import { RootStackParamList } from '@/navigation/types'
import { signUpSchema } from '@/validations/auth'
import { useAppDispatch } from '@/store/hooks'
import GoogleSignUpButton from '@/components/screens/auth/GoogleSignUpButton'

const RegisterForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterData>({
    resolver: yupResolver(signUpSchema)
  })

  const onSubmit = async (data: RegisterData) => {
    const success = await dispatch(register(data))
    if (success) {
      navigation.navigate('Home')
    }
  }

  return (
    <View style={styles.formContainer}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          name='username'
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Enter your username'
                onChangeText={onChange}
                value={value}
                editable={!isLoading}
                autoCapitalize='none'
              />
              {errors.username && (
                <Text style={styles.errorText}>{errors.username.message}</Text>
              )}
            </View>
          )}
        />
      </View>

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
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          { opacity: pressed ? 0.5 : 1 }
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text style={styles.submitButtonText}>Sign Up</Text>
        )}
      </Pressable>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      <GoogleSignUpButton />
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
    padding: spacing.md,
    marginBottom: spacing.xs,
    fontSize: typography.sizes.md
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.sm,
    fontSize: typography.sizes.xs
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.sm
  },
  submitButtonText: {
    color: colors.background,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold
  },
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
  }
})

export default RegisterForm
