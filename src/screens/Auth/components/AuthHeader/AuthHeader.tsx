import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './AuthHeader.styles'

interface AuthHeaderProps {
  title: string
  subtitle?: string
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </View>
)
export default AuthHeader
