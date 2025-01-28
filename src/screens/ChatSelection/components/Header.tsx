import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
    <Ionicons name='settings-outline' size={24} color='#3498db' />
  </View>
)

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50'
  }
})

export default Header
