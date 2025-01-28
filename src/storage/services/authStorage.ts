import AsyncStorage from '@react-native-async-storage/async-storage'

const AUTH_TOKEN_KEY = '@auth_token'
const USER_DATA_KEY = '@user_data'

export const authStorage = {
  async setToken(token: string) {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
    } catch (error) {
      console.error('Error saving auth token:', error)
    }
  },

  async getToken() {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY)
    } catch (error) {
      console.error('Error getting auth token:', error)
      return null
    }
  },

  async removeToken() {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY)
    } catch (error) {
      console.error('Error removing auth token:', error)
    }
  },

  async setAuthData(data: any) {
    try {
      await AsyncStorage.setItem('@auth_data', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving auth data:', error)
    }
  },

  async getAuthData() {
    try {
      const data = await AsyncStorage.getItem('@auth_data')
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error getting auth data:', error)
      return null
    }
  }

  // Otros métodos específicos de auth...
}
