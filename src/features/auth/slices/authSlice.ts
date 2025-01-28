import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  mode: 'login' | 'register'
  username: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  mode: 'login',
  username: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    authSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = {
        id: action.payload.id || action.payload.uid,
        email: action.payload.email,
        username:
          action.payload.username ||
          action.payload.displayName ||
          action.payload.email?.split('@')[0] ||
          'User',
        photoURL: action.payload.photoURL || null
      }
      state.username = state.user?.username || null
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
      state.username = null
    },
    setAuthMode: (state, action: PayloadAction<'login' | 'register'>) => {
      state.mode = action.payload
    }
  }
})

export const { authStart, authSuccess, authFailure, logout, setAuthMode } =
  authSlice.actions

export default authSlice.reducer
