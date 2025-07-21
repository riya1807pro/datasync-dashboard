// src/pages/index.tsx
import { useGetTrendingMoviesQuery } from "@/features/movies/movieApi";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const { data, isLoading } = useGetTrendingMoviesQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="min-h-screen bg-zinc-400 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Trending Movies 🎬</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
