import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  get_appointments: false
}

export const getAppointmentsReducer = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    updateAppointments:(state , action)=>{
        state.get_appointments = action.payload
    }
  },

})

// Action creators are generated for each case reducer function
export const { updateAppointments } = getAppointmentsReducer.actions

export default getAppointmentsReducer.reducer

