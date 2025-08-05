'use client'
import { useSelector } from 'react-redux'
import MovieCard from '@/components/MovieCard'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'

export default function FavoritesPage() {
  const [isClient, setIsClient] = useState(false)
  const favorites = useSelector((state: any) => state.favorites.favorites)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <DashboardLayout>

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⭐ Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {favorites.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
          </DashboardLayout>
  )
}
