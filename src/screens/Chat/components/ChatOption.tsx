import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ChatOptionProps {
  title: string
  description: string
  icon: string
  onPress: () => void
  disabled?: boolean
}

const ChatOption = ({
  title,
  description,
  icon,
  onPress,
  disabled
}: ChatOptionProps) => (
  <TouchableOpacity
    style={[styles.option, disabled && styles.optionDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Ionicons
      name={icon as any}
      size={30}
      color={disabled ? '#999' : '#3498db'}
    />
    <Text style={[styles.optionTitle, disabled && styles.textDisabled]}>
      {title}
    </Text>
    <Text style={[styles.optionDescription, disabled && styles.textDisabled]}>
      {description}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  option: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  optionDisabled: {
    opacity: 0.6
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5
  },
  textDisabled: {
    color: '#999'
  }
})

export default ChatOption
