import * as yup from 'yup'
import { LoginData, RegisterData } from '@/features/auth/types/auth'

export const AUTH_ERRORS = {
  REQUIRED_USERNAME: 'Nombre de usuario es requerido',
  REQUIRED_EMAIL: 'Correo es requerido',
  INVALID_EMAIL: 'Correo inválido',
  REQUIRED_PASSWORD: 'Contraseña es requerida',
  MIN_PASSWORD: 'La contraseña debe tener al menos 6 caracteres'
} as const

// Schema para registro
export const signUpSchema: yup.ObjectSchema<RegisterData> = yup.object().shape({
  username: yup.string().trim().required(AUTH_ERRORS.REQUIRED_USERNAME),
  email: yup
    .string()
    .email(AUTH_ERRORS.INVALID_EMAIL)
    .required(AUTH_ERRORS.REQUIRED_EMAIL),
  password: yup
    .string()
    .min(6, AUTH_ERRORS.MIN_PASSWORD)
    .required(AUTH_ERRORS.REQUIRED_PASSWORD)
})
export const loginSchema: yup.ObjectSchema<LoginData> = yup.object().shape({
  email: yup.string().required(AUTH_ERRORS.REQUIRED_EMAIL),
  password: yup.string().required(AUTH_ERRORS.REQUIRED_PASSWORD)
})
