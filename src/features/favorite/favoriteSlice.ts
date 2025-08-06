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
      const exists = state.favorites.find((movie) => movie.id === action.payload.id)
      if (exists) {
        state.favorites = state.favorites.filter((movie) => movie.id !== action.payload.id)
      } else {
        state.favorites.push(action.payload)
      }
    },
  },
})

export const { toggleFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
