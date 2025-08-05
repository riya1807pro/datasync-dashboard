'use client'
import { useDispatch, useSelector } from 'react-redux'
import { setMoviePrefs, setNewsPrefs } from '@/features/user/preferencesSlice'
import DashboardLayout from '@/layouts/DashboardLayout'

const movieGenres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Romance']
const newsCategories = ['Technology', 'Business', 'Sports', 'Health', 'Entertainment']

export default function SettingsPage() {
  const dispatch = useDispatch()
  const { moviePrefs, newsPrefs } = useSelector((state: any) => state.userPreferences)

  const handleGenreToggle = (genre: string) => {
    dispatch(setMoviePrefs(genre))
  }

  const handleNewsToggle = (cat: string) => {
    dispatch(setNewsPrefs(cat))
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold">⚙ User Preferences</h1>

        {/* Movie Preferences */}
        <div>
          <h2 className="text-xl font-semibold mb-2">🎬 Preferred Movie Genres</h2>
          <div className="flex flex-wrap gap-3">
            {movieGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`px-3 py-1 rounded border ${
                  (moviePrefs || []).includes(genre)
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* News Preferences */}
        <div>
          <h2 className="text-xl font-semibold mb-2">📰 Preferred News Categories</h2>
          <div className="flex flex-wrap gap-3">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleNewsToggle(cat)}
                className={`px-3 py-1 rounded border ${
                  (newsPrefs || []).includes(cat)
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}