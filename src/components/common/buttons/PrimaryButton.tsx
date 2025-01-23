// components/common/buttons/PrimaryButton.tsx
// import { PrimaryButtonProps } from '@/types/components/buttons'
// import React from 'react'
// import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native'

// export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
//   onPress,
//   title,
//   disabled = false,
//   loading = false,
//   fullWidth = false,
//   size = 'medium'
// }) => {
//   return (
//     <Pressable
//       onPress={onPress}
//       disabled={disabled || loading}
//       style={({ pressed }) => [
//         styles.button,
//         fullWidth && styles.fullWidth,
//         styles[size],
//         pressed && styles.pressed,
//         disabled && styles.disabled
//       ]}
//     >
//       {loading ? (
//         <ActivityIndicator color='white' />
//       ) : (
//         <Text style={styles.text}>{title}</Text>
//       )}
//     </Pressable>
//   )
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#007AFF', // color primario iOS
//     borderRadius: 8,
//     padding: 12,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   fullWidth: {
//     width: '100%'
//   },
//   text: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600'
//   },
//   pressed: {
//     opacity: 0.8
//   },
//   disabled: {
//     backgroundColor: '#A0A0A0'
//   },
//   small: {
//     paddingVertical: 8,
//     paddingHorizontal: 16
//   },
//   medium: {
//     paddingVertical: 12,
//     paddingHorizontal: 24
//   },
//   large: {
//     paddingVertical: 16,
//     paddingHorizontal: 32
//   }
// })
