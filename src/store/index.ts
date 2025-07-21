import { configureStore } from '@reduxjs/toolkit'
import { newsApi } from '@/features/news/newApi'
import { movieApi } from '@/features/movies/movieApi'
import userPreferencesReducer from '@/features/user/UserApi'
import { socialApi } from '@/features/social/SocialApi'

export const store = configureStore({
  reducer: {
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
