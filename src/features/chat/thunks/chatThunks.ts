import { createAsyncThunk } from '@reduxjs/toolkit'
import { socketService } from '@/services/socket/socketService'
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
  async (
    { userId, roomId }: { userId: string; roomId: string },
    { dispatch }
  ) => {
    try {
      const socket = socketService.connect(userId)

      // Unirse a la sala específica
      socketService.joinRoom(roomId)

      socket.on('connect', () => {
        dispatch(setConnectionStatus(true))
        dispatch(setError(null))
      })

      socket.on('disconnect', () => {
        dispatch(setConnectionStatus(false))
      })

      socket.on('receive_message', (message: Message) => {
        dispatch(messageReceived(message))
      })

      socket.on('operator_connected', (operatorId: string) => {
        dispatch(addOperator(operatorId))
      })

      socket.on('operator_disconnected', (operatorId: string) => {
        dispatch(removeOperator(operatorId))
      })
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : 'An error occurred')
      )
    }
  }
)

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    { roomId, message }: { roomId: string; message: string },
    { rejectWithValue }
  ) => {
    try {
      socketService.sendMessage(roomId, message)
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to send message'
      )
    }
  }
)

export const leaveChat = createAsyncThunk(
  'chat/leave',
  async (roomId: string, { dispatch }) => {
    try {
      socketService.leaveRoom(roomId)
      socketService.disconnect()
      dispatch(setConnectionStatus(false))
    } catch (error) {
      console.error('Error leaving chat:', error)
    }
  }
)
