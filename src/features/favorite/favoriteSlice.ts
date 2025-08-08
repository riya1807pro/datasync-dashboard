// src/features/favorite/favoriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoriteState {
  favorites: any[]
}

const initialState: FavoriteState = {
  favorites: [],
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<any>) => {
      const exists = state.favorites.some((m) => m.id === action.payload.id)
      if (exists) {
        state.favorites = state.favorites.filter((m) => m.id !== action.payload.id)
      } else {
        state.favorites.push(action.payload)
      }
    },
    setFavorites: (state, action: PayloadAction<any[]>) => {
      state.favorites = action.payload
    },
    clearFavorites: (state) => {
      state.favorites = []
    },
  },
})

export const { toggleFavorite, setFavorites, clearFavorites } = favoriteSlice.actions
export default favoriteSlice.reducer
