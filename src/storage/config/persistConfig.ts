import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistConfig } from 'redux-persist'

// Definimos un tipo para el estado que queremos persistir
interface PersistedState {
  auth: {
    user: any
    isAuthenticated: boolean
    error: string | null
    mode: 'login' | 'register'
    username: string | null
  }
}

// Configuración de cómo se guardan los datos
export const persistConfig: PersistConfig<PersistedState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
}
