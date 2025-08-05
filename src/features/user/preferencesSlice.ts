import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PrefState {
  moviePrefs: string[]
  newsPrefs: string[]
}

const initialState: PrefState = {
  moviePrefs: [],
  newsPrefs: [],
}

const preferencesSlice = createSlice({
  name: 'userDataPreferences',
  initialState,
  reducers: {
    setMoviePrefs: (state, action: PayloadAction<string>) => {
      if (state.moviePrefs.includes(action.payload)) {
        state.moviePrefs = state.moviePrefs.filter((g) => g !== action.payload)
      } else {
        state.moviePrefs.push(action.payload)
      }
    },
    setNewsPrefs: (state, action: PayloadAction<string>) => {
      if (state.newsPrefs.includes(action.payload)) {
        state.newsPrefs = state.newsPrefs.filter((c) => c !== action.payload)
      } else {
        state.newsPrefs.push(action.payload)
      }
    },
  },
})

export const { setMoviePrefs, setNewsPrefs } = preferencesSlice.actions
export default preferencesSlice.reducer