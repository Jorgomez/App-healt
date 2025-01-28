import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Footer = () => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.footerButton}>
      <Ionicons name='chatbubble-outline' size={24} color='#3498db' />
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton}>
      <Ionicons name='image-outline' size={24} color='#666' />
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton}>
      <Ionicons name='settings-outline' size={24} color='#666' />
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerButton}>
      <Ionicons name='person-outline' size={24} color='#666' />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  footerButton: {
    padding: 5
  }
})

export default Footer
