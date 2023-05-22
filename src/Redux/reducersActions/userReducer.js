import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userData = action.payload
    },
  },

})

// Action creators are generated for each case reducer function
export const { updateUser } = userReducer.actions

export default userReducer.reducer

