import { LoginData, RegisterData, User } from '../types/auth'

export const authService = {
  registerUser: (data: RegisterData): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          username: data.username,
          email: data.email
        })
      }, 1000)
    })
  },

  loginUser: (data: LoginData): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular una validación básica
        if (data.email && data.password) {
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            email: data.email,
            username: data.email.split('@')[0]
          })
        } else {
          reject(new Error('Credenciales inválidas'))
        }
      }, 1000)
    })
  }
}
