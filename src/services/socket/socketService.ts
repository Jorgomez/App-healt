import { io, Socket } from 'socket.io-client'
import { SOCKET_URL } from '@/config/constants'
import { Platform } from 'react-native'

class SocketService {
  // Métodos genéricos

  private socket: Socket | null = null

  connect(userId: string) {
    console.log('🔄 Iniciando conexión socket con URL:', SOCKET_URL)
    console.log('📱 Plataforma:', Platform.OS)

    this.socket = io(SOCKET_URL, {
      query: { userId },
      transports: ['websocket']
    })

    return this.socket
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data)
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback)
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }
}

export const socketService = new SocketService()
