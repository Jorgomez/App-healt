import React from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SignInScreenProps } from '@/navigation/types'

// Esquema de validación
const schema = yup.object().shape({
  email: yup.string().email('Correo inválido').required('Correo es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Contraseña es requerida')
})

// Tipos para los datos del formulario
interface FormData {
  email: string
  password: string
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    //lógica de inicio de sesión
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Sign in to HealthSync</Text>
        <Text style={styles.subtitle}>
          Welcome back! Continue your health journey
        </Text>
      </View>

      <View style={styles.formContainer}>
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
        >
          <Text style={styles.submitButtonText}>Sign In</Text>
        </Pressable>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  signUpText: {
    color: '#7f8c8d'
  },
  signUpLink: {
    color: '#3498db',
    fontWeight: 'bold'
  }
})

export default SignInScreen
