import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ChatOptionProps {
  title: string
  description: string
  icon: string
  onPress: () => void
}

const ChatOption = ({ title, description, icon, onPress }: ChatOptionProps) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Ionicons name={icon as any} size={30} color='#3498db' />
    <Text style={styles.optionTitle}>{title}</Text>
    <Text style={styles.optionDescription}>{description}</Text>
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
  }
})

export default ChatOption
