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
  const { user } = useSelector((state: RootState) => state.auth)
  const isDoctor = user?.role === 'doctor'

  console.log('User role:', user?.role)
  console.log('Is doctor:', isDoctor)

  // Sala fija para todas las conversaciones doctor-paciente
  const DOCTOR_PATIENT_ROOM = 'doctor_patient_room_1'

  const handleChatSelect = (chatType: 'doctor' | 'ai' | 'patient') => {
    if (chatType === 'ai') return // Por ahora ignoramos el AI chat

    navigation.navigate('Chat', {
      chatType,
      roomId: DOCTOR_PATIENT_ROOM
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Health Chat' />

      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.username}>{user?.username || 'User'}</Text>
          <Text style={styles.subtitle}>Select your role to chat</Text>
        </View>

        <View style={styles.optionsSection}>
          <ChatOption
            title='Join as Patient'
            description='Chat with your doctor'
            icon='person'
            onPress={() => handleChatSelect('patient')}
          />

          <ChatOption
            title='Join as Doctor'
            description='Respond to patient inquiries'
            icon='medical'
            onPress={() => handleChatSelect('doctor')}
          />

          {/* AI opción deshabilitada por ahora */}
          <ChatOption
            title='AI Assistant (Coming Soon)'
            description='Get AI health guidance'
            icon='brain'
            onPress={() => handleChatSelect('ai')}
            disabled
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
  },
  patientOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  patientOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600'
  }
})

export default SelectionScreen
