import { socketService } from '@/services/socket/socketService'

export const chatService = {
  initializeChat(userId: string) {
    return socketService.connect(userId)
  },

  joinRoom(roomId: string) {
    socketService.emit('join_room', roomId)
  },

  sendMessage(roomId: string, message: string, isDoctor: boolean) {
    socketService.emit('send_message', { roomId, message, isDoctor })
  },

  sendSystemMessage(roomId: string, message: string, isDoctor: boolean) {
    socketService.emit('system_message', { roomId, message, isDoctor })
  },

  leaveRoom(roomId: string) {
    socketService.emit('leave_room', roomId)
  },

  onMessage(callback: (data: any) => void) {
    socketService.on('receive_message', callback)
  },

  disconnect() {
    socketService.disconnect()
  }
}
