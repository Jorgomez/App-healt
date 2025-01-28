import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Keyboard
} from 'react-native'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import ChatInput from '@/components/common/inputs/ChatInput'
import ChatHeader from '../components/ChatHeader'
import { ChatScreenProps } from '@/navigation/types'
import {
  initializeChat,
  sendMessage,
  leaveChat
} from '@/features/chat/thunks/chatThunks'
import { clearMessages, setCurrentRoom } from '@/features/chat/slices/chatSlice'
import { socketService } from '@/services/socket/socketService'
import ChatMessage from '../components/ChatMessage'

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch()
  const { chatType, roomId } = route.params
  const { userId, user } = useAppSelector((state) => state.auth)
  const { messages, isConnected } = useAppSelector((state) => state.chat)
  const isDoctor = chatType === 'doctor'
  const [messagesState, setMessagesState] = useState<any[]>([])
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (user?.id) {
      console.log('🔄 Iniciando chat...')
      const socket = socketService.connect(user.id)

      socket.on('receive_message', (data) => {
        setMessagesState((prev) => [...prev, data])
      })

      if (roomId) {
        socketService.joinRoom(roomId)
        setTimeout(() => {
          const welcomeMessage = `${
            isDoctor ? 'Doctor' : 'Paciente'
          } se ha conectado al chat`
          socketService.sendSystemMessage(roomId, welcomeMessage, isDoctor)
        }, 1000)
      }
    }

    return () => {
      socketService.disconnect()
    }
  }, [user?.id, roomId])

  const handleSend = (message: string) => {
    if (message.trim() && roomId) {
      console.log(`Enviando mensaje como ${isDoctor ? 'Doctor' : 'Paciente'}`)
      socketService.sendMessage(roomId, message, isDoctor)
    }
  }

  const handleBack = () => {
    navigation.goBack()
  }

  // Función para scroll automático
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }

  // Scroll cuando llegan nuevos mensajes
  useEffect(() => {
    if (messagesState.length > 0) {
      setTimeout(scrollToBottom, 100)
    }
  }, [messagesState])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ChatHeader chatType={chatType} onBackPress={handleBack} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messageList}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps='handled'
          onContentSizeChange={scrollToBottom}
        >
          {messagesState.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.message}
              isDoctor={msg.isDoctor}
              isSender={msg.userId === user?.id}
              timestamp={msg.timestamp}
            />
          ))}
        </ScrollView>

        <ChatInput
          onSend={handleSend}
          onFocus={() => setTimeout(scrollToBottom, 100)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f8'
  },
  keyboardView: {
    flex: 1
  },
  messageList: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 15
  }
})

export default ChatScreen
