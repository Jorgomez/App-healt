import React from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import ChatInput from '@/components/common/inputs/ChatInput'
import ChatHeader from '../components/ChatHeader'
import { ChatScreenProps } from '@/navigation/types'

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const chatType = route.params?.chatType || 'ai'

  const handleSend = (message: string) => {
    // Lógica para enviar mensaje
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ChatHeader chatType={chatType} onBackPress={handleBack} />

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
          <ChatInput onSend={handleSend} />
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

export default ChatScreen
