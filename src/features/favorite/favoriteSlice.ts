// src/features/favorite/favoriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoriteState {
  favorites: any[]
}

const initialState: FavoriteState = { favorites: [] }

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setInitial(state, action: PayloadAction<any[]>) {
      state.favorites = Array.isArray(action.payload) ? action.payload : []
    },
    toggleFavorite(state, action: PayloadAction<any>) {
      const movie = action.payload
      if (!movie || !movie.id) return
      const exists = state.favorites.find((m) => m.id === movie.id)
      if (exists) state.favorites = state.favorites.filter((m) => m.id !== movie.id)
      else state.favorites.push(movie)
    },
    clearFavorites(state) {
      state.favorites = []
    },
  },
})

export const { toggleFavorite, setInitial, clearFavorites } = favoriteSlice.actions
export default favoriteSlice.reducer