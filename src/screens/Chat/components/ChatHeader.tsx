import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ChatHeaderProps {
  chatType: 'doctor' | 'ai'
  onBackPress: () => void
}

const ChatHeader = ({ chatType, onBackPress }: ChatHeaderProps) => {
  const name =
    chatType === 'doctor' ? 'Dr. Sarah Johnson' : 'AI Health Assistant'

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name='arrow-back' size={24} color='#2c3e50' />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Ionicons
            name={chatType === 'doctor' ? 'person-circle' : 'logo-github'}
            size={40}
            color='#3498db'
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>
            {chatType === 'doctor' ? 'Medical Doctor' : 'AI Assistant'}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  backButton: {
    padding: 5
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  avatarContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  nameContainer: {
    flex: 1
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  status: {
    fontSize: 14,
    color: '#666'
  }
})

export default ChatHeader
