import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  default_language: 'en',
  
}

export const languageReducer = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.default_language = action.payload
    },
  },

})

// Action creators are generated for each case reducer function
export const { changeLanguage } = languageReducer.actions

export default languageReducer.reducer

