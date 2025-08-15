'use client'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { toggleMoviePref, toggleNewsPref } from '@/features/user/preferencesSlice'
import ProtectedPage from '@/components/ProtectedPage'

export default function SettingsPage() {
  const dispatch = useDispatch()
  const { moviePrefs, newsPrefs } = useSelector((state: RootState) => state.userPreferences)

  const movieGenres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Animation"]
  const newsCategories = ["Technology", "Business", "Sports", "Entertainment", "Health", "Science", "World"]

  return (
    <DashboardLayout>
<<<<<<< HEAD
      <ProtectedPage>
      <div className="bg-card rounded shadow p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold accent mb-8">⚙ User Preferences</h1>
=======
      <div className="p-6 space-y-8 bg-white dark:bg-gray-900 rounded">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">⚙ Settings</h1>
>>>>>>> 3f1c363bb1e3c0938fb63bc0fb6bee5aeca32484

        {/* Movies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold accent mb-4">🎬 Preferred Movie Genres</h2>
          <div className="flex flex-wrap gap-3">
            {movieGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => dispatch(toggleMoviePref(genre))}
                className={`px-4 py-2 rounded border border-theme font-medium transition ${
                  moviePrefs.includes(genre)
                    ? 'bg-accent text-white'
                    : 'bg-card text-muted hover:bg-accent-2/10'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

        {/* News */}
        <section>
          <h2 className="text-xl font-semibold accent mb-4">📰 Preferred News Categories</h2>
          <div className="flex flex-wrap gap-3">
            {newsCategories.map((cat) => (
              <button
              key={cat}
                onClick={() => dispatch(toggleNewsPref(cat))}
                className={`px-4 py-2 rounded border border-theme font-medium transition ${
                  newsPrefs.includes(cat)
                    ? 'bg-accent text-white'
                    : 'bg-card text-muted hover:bg-accent-2/10'
                }`}
                >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </div>
      </ProtectedPage>
    </DashboardLayout>
  )
}