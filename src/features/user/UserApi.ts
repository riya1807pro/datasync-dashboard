// src/features/user/userSlice.ts

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
  language: 'en',
}

const userSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
  },
})

export const { setTheme, setLanguage } = userSlice.actions
export default userSlice.reducer
