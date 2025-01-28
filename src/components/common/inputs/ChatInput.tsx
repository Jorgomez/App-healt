import React from 'react'
import { StyleSheet } from 'react-native'
import BaseInput from './BaseInput'
import { colors, spacing } from '@/theme'
import { ChatInputProps } from '@/types/components/inputs'

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder,
  ...props
}) => {
  const [message, setMessage] = React.useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <BaseInput
      value={message}
      onChangeText={setMessage}
      placeholder={placeholder || 'Type a message...'}
      containerStyle={styles.container}
      inputStyle={styles.input}
      returnKeyType='send'
      onSubmitEditing={handleSend}
      multiline
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    padding: spacing.sm,
    backgroundColor: colors.background
  },
  input: {
    maxHeight: 100
  }
})

export default ChatInput
