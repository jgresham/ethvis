import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import Constants from '../Constants.json'

// Define a type for the slice state
interface SettingsState {
  isDarkMode: boolean
  executionWS: string
  consensusAPI: string
  consensusWS: string
}

// Define the initial state using that type
const initialState: SettingsState = {
  isDarkMode: false,
  executionWS: Constants.default_execution_client_websocket_endpoint,
  consensusAPI: Constants.default_consensus_client_http_endpoint,
  consensusWS: Constants.default_consensus_client_http_endpoint,
}

export const settingsSlice = createSlice({
  name: 'settings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
  },
})

export const { toggle } = settingsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsDarkMode = (state: RootState) => state.settings.isDarkMode

export default settingsSlice.reducer
