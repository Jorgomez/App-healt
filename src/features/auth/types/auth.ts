export interface User {
  id: string
  email: string | null // Cambiado para aceptar null
  username: string
  photoURL?: string | null
}

export interface RegisterData {
  username: string
  email: string
  password: string
}
export interface LoginData {
  email: string
  password: string
}
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  mode: AuthMode
}

export type AuthMode = 'login' | 'register'
