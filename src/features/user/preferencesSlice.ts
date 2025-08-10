import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loadPrefs = () => {
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem('userPreferences')
    return s ? JSON.parse(s) : { moviePrefs: [], newsPrefs: [] }
  }
  return { moviePrefs: [], newsPrefs: [] }
}

const initialState: { moviePrefs: string[]; newsPrefs: string[] } = loadPrefs()

const preferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setMoviePrefs(state, action: PayloadAction<string>) {
      const idx = state.moviePrefs.indexOf(action.payload)
      if (idx >= 0) state.moviePrefs.splice(idx, 1)
      else state.moviePrefs.push(action.payload)
      localStorage.setItem('userPreferences', JSON.stringify(state))
    },
    setNewsPrefs(state, action: PayloadAction<string>) {
      const idx = state.newsPrefs.indexOf(action.payload)
      if (idx >= 0) state.newsPrefs.splice(idx, 1)
      else state.newsPrefs.push(action.payload)
      localStorage.setItem('userPreferences', JSON.stringify(state))
    },
  },
})

export const { setMoviePrefs, setNewsPrefs } = preferencesSlice.actions
export default preferencesSlice.reducer
