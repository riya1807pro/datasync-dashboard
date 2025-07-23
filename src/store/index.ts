import { configureStore } from '@reduxjs/toolkit'
import { newsApi } from '@/features/news/newApi'
import { movieApi } from '@/features/movies/movieApi'
import userPreferencesReducer from '@/features/user/UserApi'
import { socialApi } from '@/features/social/SocialApi'
import newsReducer from "../features/news/NewsSlice"
import favoritesReducer from "../features/favorite/favoriteSlice"

export const store = configureStore({
  reducer: {
     news: newsReducer,
     favorites:favoritesReducer,
    userPreferences: userPreferencesReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().
      concat(newsApi.middleware, movieApi.middleware,
      socialApi.middleware),
})

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem('favorites', JSON.stringify(state.favorites.favorites))
  })
}


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
