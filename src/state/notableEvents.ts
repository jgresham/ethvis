import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface NotableEventsState {
  events: any[]
}

// Define the initial state using that type
export const initialState: NotableEventsState = {
  events: [{ type: 'bad_block' }],
}

console.log('Intial notableEvents state: ', initialState)

export const notableEventsSlice = createSlice({
  name: 'notableEvents',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<any[]>) => {
      state.events = action.payload
    },
  },
})

export const { setEvents } = notableEventsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGetEvents = (state: RootState): any[] => state.notableEvents.events

export default notableEventsSlice.reducer
