import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure
} from '../slices/authSlice'
import { User, RegisterData, LoginData } from '@/features/auth/types/auth'
import { AppDispatch } from '../../../store/config/store'
import { authService } from '@/features/auth/services/baseAuthService'

export const register =
  (data: RegisterData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(registerStart())
      const user = await authService.registerUser(data)
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
export const login = (data: LoginData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart())
    const user = await authService.loginUser(data)
    dispatch(loginSuccess(user))
    return true
  } catch (error) {
    dispatch(
      loginFailure(error instanceof Error ? error.message : 'Login failed')
    )
    return false
  }
}
