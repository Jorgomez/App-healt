import { RegisterData, User } from '@/types/auth'

export const authApi = {
  register: (data: RegisterData): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          username: data.username,
          email: data.email
        })
      }, 1000)
    })
  }
}
