import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import Constants from '../Constants.json'
import { executionWS, consensusAPI, consensusWS } from '../App'

// Define a type for the slice state
interface SettingsState {
  isDarkMode: boolean
  executionWs: string
  consensusApi: string
  consensusWs: string
}

// Define the initial state using that type
export const initialState: SettingsState = {
  isDarkMode: true,
  executionWs: Constants.default_execution_client_websocket_endpoint,
  consensusApi: Constants.default_beacon_client_http_endpoint,
  consensusWs: Constants.default_beacon_client_http_endpoint,
}

console.log('Intial settings state: ', initialState)

export const settingsSlice = createSlice({
  name: 'settings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
    updateSettingsConsensusApiEndpoint: (state, action: PayloadAction<string>) => {
      state.consensusApi = action.payload
      consensusAPI.changeEndpoint(state.consensusApi)
    },
    updateSettingsExecutionWsEndpoint: (state, action: PayloadAction<string>) => {
      console.log('updateSettingsExecutionWsEndpoint', state, action)
      state.executionWs = action.payload
      executionWS.changeEndpoint(state.executionWs)
    },
    updateSettingsConsensusWsEndpoint: (state, action: PayloadAction<string>) => {
      state.consensusWs = action.payload
      consensusWS.changeEndpoint(state.consensusWs)
    },
    // updateSettingsConsensusApiIsConnected: (state, action: PayloadAction<boolean>) => {
    //   state.consensusAPI.isConnected = action.payload
    // },
    // updateSettingsExecutionWsIsConnected: (state, action: PayloadAction<boolean>) => {
    //   state.executionWS.isConnected = action.payload
    // },
    // updateSettingsConsensusWsIsConnected: (state, action: PayloadAction<boolean>) => {
    //   state.consensusWS.isConnected = action.payload
    // },
  },
})

export const {
  toggleDarkMode,
  updateSettingsConsensusApiEndpoint,
  updateSettingsExecutionWsEndpoint,
  updateSettingsConsensusWsEndpoint,
} = settingsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsDarkMode = (state: RootState) => state.settings.isDarkMode

export default settingsSlice.reducer
