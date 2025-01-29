import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { initializeChat, sendMessage, leaveChat } from '../thunks/chatThunks'
import { chatService } from '../services/chatService'

export const useChat = (roomId: string, isDoctor: boolean) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    if (user?.id && roomId) {
      // Inicializar chat
      dispatch(initializeChat({ userId: user.id, roomId }))

      // Escuchar mensajes
      chatService.onMessage((data) => {
        setMessages((prev) => [...prev, data])
      })
    }

    return () => {
      if (roomId) {
        dispatch(leaveChat(roomId))
      }
    }
  }, [user?.id, roomId])

  const handleSendMessage = (message: string) => {
    if (message.trim() && roomId) {
      dispatch(sendMessage({ roomId, message, isDoctor }))
    }
  }

  return {
    messages,
    sendMessage: handleSendMessage,
    user
  }
}
