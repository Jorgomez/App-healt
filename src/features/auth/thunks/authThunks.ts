import { authStart, authSuccess, authFailure } from '../slices/authSlice'
import { User, RegisterData, LoginData } from '@/features/auth/types/auth'
import { AppDispatch } from '../../../store/config/store'
import { authService } from '@/features/auth/services/baseAuthService'

export const register =
  (data: RegisterData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authStart())
      const user = await authService.registerUser(data)
      dispatch(authSuccess(user))
      return true
    } catch (error) {
      dispatch(
        authFailure(
          error instanceof Error ? error.message : 'Registration failed'
        )
      )
      return false
    }
  }

export const login = (data: LoginData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authStart())
    const user = await authService.loginUser(data)
    dispatch(authSuccess(user))
    return true
  } catch (error) {
    dispatch(
      authFailure(error instanceof Error ? error.message : 'Login failed')
    )
    return false
  }
}
