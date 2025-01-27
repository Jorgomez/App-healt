import React from 'react'
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { WelcomeScreenProps } from '@/navigation/types'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heroContainer}>
        <Ionicons name='heart-outline' size={120} color='#3498db' />
        <Text style={styles.appName}>APP NAME</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Your intelligent health analysis solution
        </Text>
      </View>

      <PrimaryButton
        title="Let's get started"
        onPress={() => navigation.navigate('Auth')}
        icon='arrow-forward'
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f4f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,

    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    borderStyle: 'solid'
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 15
  },
  descriptionContainer: {
    width: '50%',
    marginBottom: 40,
    paddingHorizontal: 20
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24
  },
  startButton: {
    textAlign: 'center',
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,

    width: '80%'
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10
  }
})

export default WelcomeScreen
