import React, { useEffect } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { ChatScreenProps } from '@/navigation/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import ChatInput from '@/components/common/inputs/ChatInput'
import ChatHeader from '../src/screens/Chat/components/ChatHeader'
import { socketService } from '@/services/socket/socketService'

const DoctorChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch()
  const { roomId } = route.params
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    console.log('👩‍⚕️ Doctor conectándose a sala:', roomId)

    if (user?.id) {
      const socket = socketService.connect(user.id)

      socket?.on('connect', () => {
        console.log('✅ Doctor conectado')
        if (roomId) {
          socketService.joinRoom(roomId)
        }
      })
    }

    return () => {
      if (roomId) {
        socketService.leaveRoom(roomId)
      }
      socketService.disconnect()
    }
  }, [user?.id, roomId])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ChatHeader chatType='doctor' onBackPress={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.messageList}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps='handled'
        >
          {/* Lista de mensajes */}
        </ScrollView>
        <View style={styles.inputContainer}>
          <ChatInput
            onSend={(message) => {
              if (message.trim() && roomId) {
                socketService.sendMessage(roomId, message)
              }
            }}
          />
        </View>
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
    padding: 20
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  }
})

export default DoctorChatScreen
