import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ChatInputProps } from '@/types/components/inputs'

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onFocus }) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim())
      setMessage('')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder='write a message...'
        multiline
        onFocus={onFocus}
        onSubmitEditing={handleSend}
        returnKeyType='send'
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Ionicons
          name='send'
          size={24}
          color={message.trim() ? '#007AFF' : '#ccc'}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100
  },
  sendButton: {
    padding: 8,
    borderRadius: 20
  }
})

export default ChatInput
