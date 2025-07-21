// src/components/MovieCard.jsx
export default function MovieCard({ movie }:any) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 
    shadow-md w-60 hover:scale-105 transition-transform duration-300">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg mb-2"
      />
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
      <p className="text-sm text-gray-400">{movie.release_date}</p>
    </div>
  )
}
