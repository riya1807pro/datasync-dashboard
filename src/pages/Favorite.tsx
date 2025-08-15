'use client'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useUser } from '@clerk/nextjs'
import { getUserLocalFavorites } from '@/utils/userFavorites'
import { setFavorites } from '@/features/favorite/favoriteSlice'
import MovieCard from '@/components/MovieCard'
import ProtectedPage from '@/components/ProtectedPage'

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const { isSignedIn, user } = useUser()
  const favorites = useSelector((state: any) => state.favorites.favorites)
  const [isClient, setIsClient] = useState(false)

  // avoid hydration mismatch
  useEffect(() => setIsClient(true), [])

  // load localStorage favorites → redux (only after sign-in)
  useEffect(() => {
    if (isSignedIn && user?.id) {
      const localFav = getUserLocalFavorites(user.id)
      dispatch(setFavorites(localFav))
    }
  }, [isSignedIn, user?.id, dispatch])

  if (!isClient) return null

  return (
    <DashboardLayout>
      <ProtectedPage>
        <div className="p-6">
          <h1 className="text-2xl font-bold accent mb-4">⭐ Your Favorites</h1>
          {favorites.length === 0 ? (
            <p className="text-muted">No favorites added yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {favorites.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </ProtectedPage>
    </DashboardLayout>
  )
}