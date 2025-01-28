import { io, Socket } from 'socket.io-client'
import { SOCKET_URL } from '@/config/constants'
import { Platform } from 'react-native'

class SocketService {
  private socket: Socket | null = null

  connect(userId: string) {
    console.log('🔄 Iniciando conexión socket con URL:', SOCKET_URL)
    console.log('📱 Plataforma:', Platform.OS)

    this.socket = io(SOCKET_URL, {
      query: { userId },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 3
    })

    this.socket.on('connect', () => {
      console.log('🟢 Socket conectado exitosamente')
      console.log('🟢 Socket ID:', this.socket?.id)
    })

    this.socket.on('connect_error', (error) => {
      console.error('❌ Error de conexión:', error.message)
      console.error('❌ Error completo:', error)
    })

    return this.socket
  }

  joinRoom(roomId: string) {
    console.log('Intentando unirse a sala:', roomId)
    this.socket?.emit('join_room', roomId)
  }

  sendMessage(roomId: string, message: string, isDoctor: boolean) {
    this.socket?.emit('send_message', { roomId, message, isDoctor })
  }

  sendSystemMessage(roomId: string, message: string, isDoctor: boolean) {
    this.socket?.emit('system_message', { roomId, message, isDoctor })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }
}

export const socketService = new SocketService()
