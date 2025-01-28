import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState, Message } from '../types/chat'

const initialState: ChatState = {
  messages: [],
  isConnected: false,
  activeOperators: [],
  currentRoom: null,
  error: null,
  isLoading: false
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
    messageReceived: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setCurrentRoom: (state, action: PayloadAction<string | null>) => {
      state.currentRoom = action.payload
    },
    addOperator: (state, action: PayloadAction<string>) => {
      state.activeOperators.push(action.payload)
    },
    removeOperator: (state, action: PayloadAction<string>) => {
      state.activeOperators = state.activeOperators.filter(
        (id) => id !== action.payload
      )
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearMessages: (state) => {
      state.messages = []
    }
  }
})

export const {
  setConnectionStatus,
  messageReceived,
  setCurrentRoom,
  addOperator,
  removeOperator,
  setError,
  clearMessages
} = chatSlice.actions

export default chatSlice.reducer
