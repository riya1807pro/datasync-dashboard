import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PrefState {
  moviePrefs: string[]
  newsPrefs: string[]
}

const loadPrefs = (): PrefState => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('userPreferences')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
  }
  return { moviePrefs: [], newsPrefs: [] }
}

const initialState: PrefState = loadPrefs()

const preferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    toggleMoviePref(state, action: PayloadAction<string>) {
      const idx = state.moviePrefs.indexOf(action.payload)
      if (idx >= 0) state.moviePrefs.splice(idx, 1)
      else state.moviePrefs.push(action.payload)
      localStorage.setItem('userPreferences', JSON.stringify(state))
    },
    toggleNewsPref(state, action: PayloadAction<string>) {
      const idx = state.newsPrefs.indexOf(action.payload)
      if (idx >= 0) state.newsPrefs.splice(idx, 1)
      else state.newsPrefs.push(action.payload)
      localStorage.setItem('userPreferences', JSON.stringify(state))
    },
    setPrefs(state, action: PayloadAction<PrefState>) {
      state.moviePrefs = action.payload.moviePrefs
      state.newsPrefs = action.payload.newsPrefs
      localStorage.setItem('userPreferences', JSON.stringify(state))
    }
  }
})

export const { toggleMoviePref, toggleNewsPref, setPrefs } = preferencesSlice.actions
export default preferencesSlice.reducer