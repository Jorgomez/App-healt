import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from '@/features/auth/slices/authSlice'
import { configurePersist, createPersistor } from '@/storage'

const rootReducer = combineReducers({
  auth: authReducer
})

const persistedReducer = configurePersist(rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = createPersistor(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
