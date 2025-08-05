'use client'
import { useGetTrendingMoviesQuery } from '@/features/movies/movieApi'
import { useGetTopHeadlinesQuery } from '@/features/news/newApi'
import MovieCard from '@/components/MovieCard'
import Link from 'next/link'
import DashboardLayout from '@/layouts/DashboardLayout'

export default function Home() {
  const { data: trendingData, isLoading: loadingMovies } = useGetTrendingMoviesQuery()
  const { data: newsData, isLoading: loadingNews } = useGetTopHeadlinesQuery('all')

  return (
    <DashboardLayout>
      <div className=" space-y-10">
        {/* 🔥 Trending Movies */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">🔥 Trending Now</h2>
            <Link href="/Movie" className="text-blue-500 hover:underline">See All</Link>
          </div>

          {/* Horizontal Scroll Movies */}
          <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-400">
            {loadingMovies ? (
              <p>Loading...</p>
            ) : (
              trendingData?.results?.slice(0, 6).map((movie: any) => (
                <div
                  key={movie.id}
                  className="min-w-[29%] max-w-sm flex-shrink-0"
                >
                  <MovieCard movie={movie} />
                </div>
              ))
            )}
          </div>
        </section>

        {/* 🗞 Top News */}
        <section className="px-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">🗞 Top News</h2>
            <Link href="/News" className="text-sm text-blue-600 hover:underline">More News</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {!loadingNews && newsData?.articles?.length > 0 ? (
              newsData.articles.slice(0, 3).map((article: any, i: number) => (
                <div key={i} className="border p-4 rounded shadow-sm bg-white">
                  <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-700">{article.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No news available.</p>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}