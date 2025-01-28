import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/config/store'
import { ChatSelectionScreenProps } from '@/navigation/types'
import Header from '../components/Header'
import ChatOption from '../components/ChatOption'
import Footer from '../components/Footer'

const SelectionScreen: React.FC<ChatSelectionScreenProps> = ({
  navigation
}) => {
  const { username } = useSelector((state: RootState) => state.auth)

  const handleChatSelect = (chatType: 'doctor' | 'ai') => {
    navigation.navigate('Chat', { chatType })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title='AI Chat' />

      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.username}>{username || 'User'}</Text>
          <Text style={styles.subtitle}>
            Who would you like to chat with today?
          </Text>
        </View>

        <View style={styles.optionsSection}>
          <ChatOption
            title='Your Personal Doctor'
            description='Chat with a medical professional'
            icon='medical'
            onPress={() => handleChatSelect('doctor')}
          />

          <ChatOption
            title='Your AI Health Assistant'
            description='Get instant AI-powered health guidance'
            icon='brain'
            onPress={() => handleChatSelect('ai')}
          />
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8'
  },
  content: {
    flex: 1,
    padding: 20
  },
  welcomeSection: {
    marginVertical: 30,
    alignItems: 'center'
  },
  username: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center'
  },
  optionsSection: {
    marginTop: 30
  }
})

export default SelectionScreen
