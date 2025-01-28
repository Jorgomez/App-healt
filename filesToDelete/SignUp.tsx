import React from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignUpScreenProps } from '@/navigation/types'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '@/features/auth/thunks/authThunks'
import { RootState } from '@/store/config/store'
import { RegisterData } from '@/features/auth/types/auth'
import { useAppDispatch } from '@/store/hooks'
import { signUpSchema } from '@/validations/auth'
import GoogleSignUpButton from 'filesToDelete/GoogleSignUpButton'

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterData>({
    resolver: yupResolver(signUpSchema)
  })

  ///componetizarla en un hook en hooks/auth/useSignUp.ts
  const onSubmit = async (data: RegisterData) => {
    const success = await dispatch(register(data))
    if (success) {
      navigation.navigate('Home')
      console.log(data)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Sign up with us</Text>
        <Text style={styles.subtitle}>
          Stay informed about your health all the time
        </Text>
      </View>

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
                  <Text style={styles.errorText}>
                    {errors.username.message}
                  </Text>
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
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
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
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            disabled={isLoading}
          >
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    justifyContent: 'center',
    padding: 20,
    width: '100%'
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  inputGroup: {
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
    fontWeight: '500'
  },
  input: {
    backgroundColor: '#f7f8f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
    fontSize: 16
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  signInText: {
    color: '#7f8c8d'
  },
  signInLink: {
    color: '#3498db',
    fontWeight: 'bold'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0'
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#7f8c8d'
  }
})

export default SignUpScreen
