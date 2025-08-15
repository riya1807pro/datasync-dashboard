'use client'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useSelector } from 'react-redux'

export default function Home() {
  const { moviePrefs, newsPrefs } = useSelector((state: any) => state.userPreferences)

  const { data: trendingData, isLoading: loadingMovies } = useGetTrendingMoviesQuery()
  const { data: newsData, isLoading: loadingNews } = useGetTopHeadlinesQuery('all')

  // ✅ Genre ID to Name
  function getGenreNameFromId(id: number): string {
    const genreMap: Record<number, string> = {
      28: 'Action',
      35: 'Comedy',
      18: 'Drama',
      10749: 'Romance',
      878: 'Sci-Fi',
      // Add more if needed
    }
    return genreMap[id] || ''
  }

  // ✅ Filter Movies
const filteredMovies = ((moviePrefs || []).length === 0
  ? trendingData?.results
  : trendingData?.results?.filter((movie: any) =>
      movie.genre_ids?.some((gid: number) =>
        (moviePrefs || []).includes(getGenreNameFromId(gid))
      )
    )
)?.slice(0, 6)


  // ✅ Filter News
const filteredNews = ((newsPrefs||[]).length === 0
  ? newsData?.articles
  : newsData?.articles?.filter((article: any) =>
      newsPrefs.some((cat: string) =>
        article.title?.toLowerCase().includes(cat.toLowerCase())
      )
    )
)?.slice(0, 3)



  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* 🔥 Trending Movies */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">🔥 Trending Now</h2>
            <Link href="/Movie" className="text-blue-500 hover:underline">
              See All
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-400">
            {loadingMovies ? (
              <p>Loading...</p>
            ) : filteredMovies?.length ? (
              filteredMovies.map((movie: any) => (
                <div key={movie.id} className="min-w-[20%] max-w-sm flex-shrink-0">
                  <MovieCard movie={movie} />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No movies match your preferences.</p>
            )}
          </div>
        </section>

        {/* 🗞 Top News */}
        <section className="px-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">🗞 Top News</h2>
            <Link href="/News" className="text-sm text-blue-600 hover:underline">
              More News
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loadingNews ? (
              <p>Loading...</p>
            ) : filteredNews?.length ? (
              filteredNews.map((article: any, i: number) => (
                <Link href="/News">
                <div key={i}  className="border p-4 rounded shadow-sm bg-white">
                  <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-700">{article.description}</p>
                </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No news matching your interests.</p>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
