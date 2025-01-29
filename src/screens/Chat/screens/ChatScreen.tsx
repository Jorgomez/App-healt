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
import ChatInput from '@/components/common/inputs/ChatInput'
import ChatHeader from '../components/ChatHeader'
import { ChatScreenProps } from '@/navigation/types'
import ChatMessage from '../components/ChatMessage'
import { useChat } from '@/features/chat/hooks/useChat'

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const { chatType, roomId } = route.params
  const isDoctor = chatType === 'doctor'
  const { messages, sendMessage, user } = useChat(roomId, isDoctor)
  const scrollViewRef = useRef<ScrollView>(null)

  const handleBack = () => {
    navigation.goBack()
  }
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 100)
    }
  }, [messages])

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
          {messages.map((msg, index) => (
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
          onSend={sendMessage}
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
    flex: 1,
    width: '100%'
  },
  messageList: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    minHeight: '100%'
  }
})

export default ChatScreen
