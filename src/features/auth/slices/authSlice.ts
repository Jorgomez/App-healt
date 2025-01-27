import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  mode: 'login' | 'register'
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  mode: 'login'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    authSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.mode = 'login'
    },
    setAuthMode: (state, action: PayloadAction<'login' | 'register'>) => {
      state.mode = action.payload
    }
  }
})

export const { authStart, authSuccess, authFailure, logout, setAuthMode } =
  authSlice.actions

export default authSlice.reducer
