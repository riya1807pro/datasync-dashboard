import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const getInitialFavorites = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('favorites')
    if (saved) return JSON.parse(saved)
  }
  return []
}

const initialState = {
  favorites: getInitialFavorites(),
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<any>) => {
      const exists = state.favorites.find((item:any) => item.id === action.payload.id)
      if (exists) {
        state.favorites = state.favorites.filter((item:any) => item.id !== action.payload.id)
      } else {
        state.favorites.push(action.payload)
      }
    },
  },
})

export const { toggleFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
