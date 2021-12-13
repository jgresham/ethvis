import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import settingsReducer from './settings'
import { load, save } from 'redux-localstorage-simple'
import { RtkqConsensusApi } from './services'

const PERSISTED_KEYS: string[] = ['settings']

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    [RtkqConsensusApi.reducerPath]: RtkqConsensusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(RtkqConsensusApi.middleware)
      .concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({
    states: PERSISTED_KEYS,
  }),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export default store

// RTK setup: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
