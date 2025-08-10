// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { movieApi } from '@/features/movies/movieApi'
import { newsApi } from '@/features/news/newApi'
import favoriteReducer from '@/features/favorite/favoriteSlice'
import preferencesReducer from '@/features/user/preferencesSlice'
import uiErrorReducer from '@/features/uiError/uiErrorSlice'
import savedNewsReducer from '@/features/news/savedNewsSlice'
import uiReducer from "@/features/ui/uiSlice"

// configure store
export const store = configureStore({
  reducer: {
    ui : uiReducer,
    favorites: favoriteReducer,
    userPreferences: preferencesReducer,
    uiError: uiErrorReducer,
    savedNews: savedNewsReducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware, newsApi.middleware),
})

// client-only localStorage sync
if (typeof window !== 'undefined') {
  // initial hydration for favorites & prefs
  const storedFavs = localStorage.getItem('favorites')
  if (storedFavs) {
    try {
      const parsed = JSON.parse(storedFavs)
      store.dispatch({ type: 'favorites/setInitial', payload: parsed })
    } catch {}
  }

  const storedPrefs = localStorage.getItem('userPreferences')
  if (storedPrefs) {
    try {
      const parsed = JSON.parse(storedPrefs)
      store.dispatch({ type: 'userPreferences/setInitial', payload: parsed })
    } catch {}
  }

  store.subscribe(() => {
    const state = store.getState()
    try {
      localStorage.setItem('favorites', JSON.stringify(state.favorites.favorites))
      localStorage.setItem('userPreferences', JSON.stringify({
        moviePrefs: state.userPreferences.moviePrefs,
        newsPrefs: state.userPreferences.newsPrefs,
      }))
    } catch {}
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch