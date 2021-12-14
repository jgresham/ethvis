import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface SearchState {
  text: string
}

// Define the initial state using that type
export const initialState: SearchState = {
  text: '',
}

console.log('Intial search state: ', initialState)

export const searchSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
})

export const { updateSearchText } = searchSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSearchText = (state: RootState) => state.search.text

export default searchSlice.reducer
