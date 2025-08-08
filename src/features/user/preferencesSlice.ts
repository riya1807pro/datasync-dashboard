// src/features/user/preferencesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loadPrefs = () => {
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem('userPrefs')
    return s ? JSON.parse(s) : { moviePrefs: [], newsPrefs: [] }
  }
  return { moviePrefs: [], newsPrefs: [] }
}

const initialState = loadPrefs()

const preferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    toggleMoviePref(state, action: PayloadAction<string>) {
      const idx = state.moviePrefs.indexOf(action.payload)
      if (idx >= 0) state.moviePrefs.splice(idx, 1)
      else state.moviePrefs.push(action.payload)
      if (typeof window !== 'undefined') localStorage.setItem('userPrefs', JSON.stringify(state))
    },
    toggleNewsPref(state, action: PayloadAction<string>) {
      const idx = state.newsPrefs.indexOf(action.payload)
      if (idx >= 0) state.newsPrefs.splice(idx, 1)
      else state.newsPrefs.push(action.payload)
      if (typeof window !== 'undefined') localStorage.setItem('userPrefs', JSON.stringify(state))
    },
    setPrefs(state, action: PayloadAction<any>) {
      state.moviePrefs = action.payload.moviePrefs || []
      state.newsPrefs = action.payload.newsPrefs || []
      if (typeof window !== 'undefined') localStorage.setItem('userPrefs', JSON.stringify(state))
    }
  }
})
export const { toggleMoviePref, toggleNewsPref, setPrefs } = preferencesSlice.actions
export default preferencesSlice.reducer
