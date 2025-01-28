import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/config/store'
import { socketService } from '@/services/socket/socketService'

export const useSocket = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user?.id) {
      // Conectar al socket cuando el usuario está autenticado
      socketService.connect(user.id)

      // Si el usuario es operador, emitir disponibilidad
      if (user.role === 'operator') {
        socketService.emitOperatorAvailable()
      } else {
        // Si es usuario normal, emitir disponibilidad
        socketService.emitUserAvailable()
      }
    }

    return () => {
      // Desconectar al desmontar
      socketService.disconnect()
    }
  }, [user?.id])

  return socketService
}
