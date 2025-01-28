import { useAppDispatch } from '@/store/hooks'
import { useNavigation } from '@react-navigation/native'
import { LoginData, RegisterData } from '../types/auth'
import { login, register } from '../thunks/authThunks'
import { RootStackParamList } from '@/navigation/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { authSuccess } from '../slices/authSlice'

export const useRegisterForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: RegisterData) => {
    const success = await dispatch(register(data))
    if (success) {
      navigation.navigate('Home')
      console.log(data)
    }
  }

  return onSubmit
}

export const useLoginForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: LoginData) => {
    const success = await dispatch(login(data))
    if (success) {
      navigation.navigate('Home')
    }
  }

  return onSubmit
}
