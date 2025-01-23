import {
  registerStart,
  registerSuccess,
  registerFailure
} from '../slices/authSlice'
import { User, RegisterData } from '@/types/auth'
import { AppDispatch } from '../config/store'
import { authApi } from '@/services/api/auth'

export const register =
  (data: RegisterData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(registerStart())
      const user = await authApi.register(data)
      dispatch(registerSuccess(user))
      return true
    } catch (error) {
      dispatch(
        registerFailure(
          error instanceof Error ? error.message : 'Registration failed'
        )
      )
      return false
    }
  }
