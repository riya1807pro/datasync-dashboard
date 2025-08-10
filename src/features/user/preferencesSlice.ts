// src/features/user/preferencesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PrefState = {
  moviePrefs: string[]
  newsPrefs: string[]
}

const initialState: PrefState = {
  moviePrefs: [],
  newsPrefs: [],
}

const preferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setInitial(state, action: PayloadAction<Partial<PrefState>>) {
      state.moviePrefs = Array.isArray(action.payload.moviePrefs) ? action.payload.moviePrefs : state.moviePrefs
      state.newsPrefs = Array.isArray(action.payload.newsPrefs) ? action.payload.newsPrefs : state.newsPrefs
    },
    toggleMoviePref(state, action: PayloadAction<string>) {
      const v = action.payload
      if (!Array.isArray(state.moviePrefs)) state.moviePrefs = []
      const idx = state.moviePrefs.indexOf(v)
      if (idx >= 0) state.moviePrefs.splice(idx, 1)
      else state.moviePrefs.push(v)
    },
    toggleNewsPref(state, action: PayloadAction<string>) {
      const v = action.payload
      if (!Array.isArray(state.newsPrefs)) state.newsPrefs = []
      const idx = state.newsPrefs.indexOf(v)
      if (idx >= 0) state.newsPrefs.splice(idx, 1)
      else state.newsPrefs.push(v)
    },
    clearPrefs(state) {
      state.moviePrefs = []; state.newsPrefs = []
    },
  },
})

export const { toggleMoviePref, toggleNewsPref, setInitial, clearPrefs } = preferencesSlice.actions
export default preferencesSlice.reducer