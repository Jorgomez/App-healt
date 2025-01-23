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

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>APP NAME</Text>
        <TouchableOpacity style={styles.profileIcon}>
          <Ionicons name='person-circle-outline' size={35} color='#3498db' />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity style={styles.quickAccessButton}>
              <Ionicons name='nutrition-outline' size={30} color='#3498db' />
              <Text style={styles.quickAccessText}>Intake Form</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessButton}>
              <Ionicons name='stats-chart-outline' size={30} color='#3498db' />
              <Text style={styles.quickAccessText}>My Records</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessButton}>
              <Ionicons
                name='chatbubble-ellipses-outline'
                size={30}
                color='#3498db'
              />
              <Text style={styles.quickAccessText}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessButton}>
              <Ionicons name='fitness-outline' size={30} color='#3498db' />
              <Text style={styles.quickAccessText}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessButton}>
              <Ionicons name='fitness-outline' size={30} color='#3498db' />
              <Text style={styles.quickAccessText}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessButton}>
              <Ionicons name='fitness-outline' size={30} color='#3498db' />
              <Text style={styles.quickAccessText}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessButton}>
              <Ionicons name='fitness-outline' size={30} color='#3498db' />
              <Text style={styles.quickAccessText}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessButton}>
              <Ionicons name='fitness-outline' size={30} color='#3498db' />
              <Text style={styles.quickAccessText}>Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.healthTipsSection}>
          <Text style={styles.sectionTitle}>Health Tip of the Day</Text>
          <View style={styles.healthTipCard}>
            <Text style={styles.healthTipText}>
              Stay consistently hydrated. Drink at least 8 glasses of water
              daily to optimize your health and well-being.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  profileIcon: {
    padding: 5
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20
  },
  quickAccessSection: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  quickAccessButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  quickAccessText: {
    marginTop: 10,
    color: '#3498db',
    fontWeight: '600'
  },
  healthTipsSection: {},
  healthTipCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  healthTipText: {
    color: '#666',
    lineHeight: 22
  }
})
