import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoriteState {
  favorites: any[]
}

const initialState: FavoriteState = { favorites: [] }

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<any[]>) {
      state.favorites = Array.isArray(action.payload) ? action.payload : []
    },
    toggleFavorite(state, action: PayloadAction<any>) {
      const movie = action.payload
      if (!movie || !movie.id) return
      const exists = state.favorites.find((m) => m.id === movie.id)
      if (exists) {
        // remove
        state.favorites = state.favorites.filter((m) => m.id !== movie.id)
      } else {
        // add
        state.favorites.push(movie)
      }
    },
    clearFavorites(state) {
      state.favorites = []
    },
  },
})

export const { setFavorites, toggleFavorite, clearFavorites } = favoriteSlice.actions
export default favoriteSlice.reducer