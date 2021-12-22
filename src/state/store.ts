import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import settingsReducer from './settings'
import searchReducer from './search'
import notableEventsReducer from './notableEvents'
import { load, save } from 'redux-localstorage-simple'
import { RtkqConsensusApi, RtkqExecutionWs } from './services'
import { initialState as settingsInitialState } from './settings'
import { initialState as searchInitialState } from './search'
import { initialState as notableEventsInitialState } from './notableEvents'
import { executionWS, consensusAPI, consensusWS } from '../App'

const PERSISTED_KEYS: string[] = ['settings', 'search', 'notableEvents']

interface appState {
  settings: typeof settingsInitialState
  search: typeof searchInitialState
  notableEvents: typeof notableEventsInitialState
}

const loadPersistedState = () => {
  const persistedState = load({
    states: PERSISTED_KEYS,
    preloadedState: {
      settings: { ...settingsInitialState },
      search: { ...searchInitialState },
      notableEvents: { ...notableEventsInitialState },
    },
  }) as appState
  console.log('Loaded application state: ', persistedState)
  // special case: set endpoints for Apis
  const loadedAppState = persistedState as appState
  executionWS.changeEndpoint(loadedAppState?.settings?.executionWs)
  consensusAPI.changeEndpoint(loadedAppState?.settings?.consensusApi)
  consensusWS.changeEndpoint(loadedAppState?.settings?.consensusApi)
  persistedState.notableEvents = { ...notableEventsInitialState }
  return persistedState
}
const store = configureStore({
  reducer: {
    settings: settingsReducer,
    search: searchReducer,
    notableEvents: notableEventsReducer,
    [RtkqConsensusApi.reducerPath]: RtkqConsensusApi.reducer,
    [RtkqExecutionWs.reducerPath]: RtkqExecutionWs.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(RtkqConsensusApi.middleware)
      .concat(RtkqExecutionWs.middleware)
      .concat(save({ states: PERSISTED_KEYS })),
  preloadedState: loadPersistedState(),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export default store

// RTK setup: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
