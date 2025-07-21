import { configureStore } from '@reduxjs/toolkit'
import { newsApi } from '@/features/news/newApi'
import { movieApi } from '@/features/movies/movieApi'
import userPreferencesReducer from '@/features/user/UserApi'

export const store = configureStore({
  reducer: {
    userPreferences: userPreferencesReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware, movieApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
