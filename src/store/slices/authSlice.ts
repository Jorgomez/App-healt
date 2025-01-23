import { AuthState, User } from '@/types/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    }
  }
})

export const { registerStart, registerSuccess, registerFailure, logout } =
  authSlice.actions
export default authSlice.reducer
