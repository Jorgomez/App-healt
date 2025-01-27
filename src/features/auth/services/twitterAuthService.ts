// src/features/auth/services/twitterAuthService.ts

import { TwitterAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '@/config/firebaseConfig'
import { User } from '../types/auth'

export const twitterAuthService = {
  async signInWithTwitter(token: string, secret: string): Promise<User> {
    try {
      console.log('Signing in with Twitter credentials')
      const credential = TwitterAuthProvider.credential(token, secret)
      const { user: firebaseUser } = await signInWithCredential(
        auth,
        credential
      )
      console.log('Firebase user:', firebaseUser)

      // Obtener datos específicos del proveedor de Twitter
      const twitterProvider = firebaseUser.providerData.find(
        (provider) => provider.providerId === 'twitter.com'
      )

      if (!twitterProvider) {
        throw new Error('No Twitter provider data found')
      }

      return {
        id: firebaseUser.uid,
        email: twitterProvider.email, // Firebase manejará esto como null si no hay email
        username: twitterProvider.displayName || firebaseUser.uid,
        photoURL: twitterProvider.photoURL
      }
    } catch (error: any) {
      console.error('Error in twitterAuthService:', error)
      throw new Error(
        `Twitter authentication error: ${error.message || 'Unknown error'}`
      )
    }
  }
}
