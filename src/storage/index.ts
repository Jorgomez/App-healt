import { persistStore, persistReducer } from 'redux-persist'
import { Store, Reducer as ReducerType } from '@reduxjs/toolkit'
import { persistConfig } from './config/persistConfig'

// Conecta el storage con Redux
export const configurePersist = (rootReducer: ReducerType) => {
  return persistReducer(persistConfig, rootReducer)
}

export const createPersistor = (store: Store) => {
  return persistStore(store)
}

export * from './services/authStorage'
