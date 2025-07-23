'use client'
import { useGetTrendingMoviesQuery } from '@/features/movies/movieApi'
import { useGetTopHeadlinesQuery } from '@/features/news/newApi'
import MovieCard from '@/components/MovieCard'
import NewsCard from '@/components/NewsCard'
import Link from 'next/link'
import DashboardLayout from '@/layouts/DashboardLayout'

export default function Home() {
  const { data: trendingData, isLoading: loadingMovies } = useGetTrendingMoviesQuery()
  const { data: newsData, isLoading: loadingNews } = useGetTopHeadlinesQuery('all')

  return (
  <DashboardLayout>
      <div className="p-6 space-y-10">
      {/* Trending Movies */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">🔥 Trending Now</h2>
          <Link href="/Movie" className="text-blue-500 hover:underline">See All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {loadingMovies ? 'Loading...' :
            trendingData?.results?.slice(0, 6).map((movie:any) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          }
        </div>
      </div>

      {/* Top News */}
      <section className="mt-10 px-4">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold flex items-center gap-2">
      🗞️ Top News
    </h2>
    <a href="/News" className="text-sm text-blue-600 hover:underline">More News</a>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {!loadingNews && newsData?.articles?.length > 0 ? (
    newsData.articles.slice(0, 3).map((article:any, i:any) => (
      <div key={i} className="border p-2">
        <h3 className="font-bold">{article.title}</h3>
        <p>{article.description}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No news available.</p>
  )}
</div>

  </div>
</section>

    </div>
  </DashboardLayout>
  )
}
