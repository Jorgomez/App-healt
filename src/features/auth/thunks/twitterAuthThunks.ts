// src/features/auth/thunks/twitterAuthThunks.ts

import { authStart, authSuccess, authFailure } from '../slices/authSlice'
import { AppDispatch } from '@/store/config/store'
import { twitterAuthService } from '../services/twitterAuthService'

export const twitterAuth =
  (token: string, secret: string) => async (dispatch: AppDispatch) => {
    console.log('Dispatching Twitter auth')
    try {
      dispatch(authStart())
      const user = await twitterAuthService.signInWithTwitter(token, secret)
      console.log('Auth success, user:', user)
      dispatch(authSuccess(user))
      return user
    } catch (error: any) {
      console.error('Auth failure:', error)
      const errorMessage = error.message || 'Unknown authentication error'
      dispatch(authFailure(errorMessage))
      throw error
    }
  }
