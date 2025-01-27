// src/features/auth/services/googleAuthService.ts
import {
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential
} from 'firebase/auth'
import { auth } from '@/config/firebaseConfig'
import { User } from '../types/auth'
export const googleAuthService = {
  async signInWithGoogle(token: string): Promise<User> {
    const credential = GoogleAuthProvider.credential(token)
    const { user: firebaseUser } = await signInWithCredential(auth, credential)

    if (!firebaseUser.email) throw new Error('No email provided')

    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      username: firebaseUser.displayName || firebaseUser.email.split('@')[0]
    }
  }
}
