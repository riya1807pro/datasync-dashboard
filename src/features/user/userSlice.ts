// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserPreferencesState = {
  theme: 'light' | 'dark'
  language: 'en' | 'hi'
}

const initialState: UserPreferencesState = {
  theme: 'light',
  language: 'en',
}

const userSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload
    },
    setLanguage(state, action: PayloadAction<'en' | 'hi'>) {
      state.language = action.payload
    },
  },
})

export const { setTheme, setLanguage } = userSlice.actions
export default userSlice.reducer