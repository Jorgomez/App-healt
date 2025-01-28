import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface ChatMessageProps {
  message: string
  isDoctor: boolean
  isSender: boolean
  timestamp: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isDoctor,
  isSender,
  timestamp
}) => {
  return (
    <View
      style={[
        styles.container,
        isSender ? styles.senderContainer : styles.receiverContainer
      ]}
    >
      <View
        style={[
          styles.bubble,
          isSender ? styles.senderBubble : styles.receiverBubble,
          isDoctor && styles.doctorBubble
        ]}
      >
        <Text
          style={[
            styles.message,
            isSender ? styles.senderText : styles.receiverText
          ]}
        >
          {message}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 8
  },
  senderContainer: {
    alignItems: 'flex-end'
  },
  receiverContainer: {
    alignItems: 'flex-start'
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20
  },
  senderBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4
  },
  receiverBubble: {
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 4
  },
  doctorBubble: {
    backgroundColor: '#34C759' // Color verde para mensajes del doctor
  },
  message: {
    fontSize: 16,
    marginBottom: 4
  },
  senderText: {
    color: 'white'
  },
  receiverText: {
    color: '#000'
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end'
  }
})

export default ChatMessage
