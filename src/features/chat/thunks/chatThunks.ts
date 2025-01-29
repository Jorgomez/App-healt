import { createAsyncThunk } from '@reduxjs/toolkit'
import { chatService } from '../services/chatService'
import {
  setConnectionStatus,
  messageReceived,
  addOperator,
  removeOperator,
  setError
} from '../slices/chatSlice'
import { Message } from '../types/chat'

export const initializeChat = createAsyncThunk(
  'chat/initialize',
  async ({ userId, roomId }: { userId: string; roomId: string }) => {
    await chatService.initializeChat(userId)
    chatService.joinRoom(roomId)
    return { roomId }
  }
)

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({
    roomId,
    message,
    isDoctor
  }: {
    roomId: string
    message: string
    isDoctor: boolean
  }) => {
    chatService.sendMessage(roomId, message, isDoctor)
    return { message, isDoctor }
  }
)

export const leaveChat = createAsyncThunk(
  'chat/leave',
  async (roomId: string) => {
    chatService.leaveRoom(roomId)
    chatService.disconnect()
  }
)
