// src/features/auth/thunks/googleAuthThunks.ts
import { authStart, authSuccess, authFailure } from '../slices/authSlice'
import { AppDispatch } from '../../../store/config/store'
import { googleAuthService } from '@/features/auth/services/googleAuthService'

export const googleAuth = (token: string) => async (dispatch: AppDispatch) => {
  try {
    console.log('Starting Google Auth with token:', token)
    dispatch(authStart())

    const user = await googleAuthService.signInWithGoogle(token)
    console.log('Authentication successful:', user)

    dispatch(authSuccess(user))
    return user
  } catch (error: any) {
    console.error('Auth error:', error)
    dispatch(authFailure(error.message))
    throw error
  }
}
