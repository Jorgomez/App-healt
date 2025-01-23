export interface User {
  id: string
  username: string
  email: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
