// features/chat/types/chat.ts
export interface Message {
  id: string
  text: string
  userId: string
  roomId: string
  timestamp: string
  type: 'user' | 'operator'
}

export interface ChatState {
  messages: Message[]
  isConnected: boolean
  activeOperators: string[]
  currentRoom: string | null
  error: string | null
  isLoading: boolean
}

export interface SendMessagePayload {
  roomId: string
  message: string
  userId: string
  type: 'user' | 'operator'
}
