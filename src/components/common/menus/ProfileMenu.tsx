import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import LogoutButton from '../buttons/LogoutButton'

const ProfileMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const toggleMenu = () => {
    console.log('🔵 Menu toggled')
    setIsMenuVisible(!isMenuVisible)
  }

  return (
    <>
      {isMenuVisible && (
        <Pressable style={styles.overlay} onPress={toggleMenu} />
      )}
      <View style={styles.container}>
        <TouchableOpacity style={styles.profileIcon} onPress={toggleMenu}>
          <Ionicons name='person-circle-outline' size={35} color='#3498db' />
        </TouchableOpacity>

        {isMenuVisible && (
          <View style={styles.menuContainer}>
            <LogoutButton />
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  container: {
    zIndex: 1000 // Contenedor principal por encima del overlay
  },
  profileIcon: {
    padding: 5,
    zIndex: 1000
  },
  menuContainer: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
    zIndex: 1000
  }
})

export default ProfileMenu
