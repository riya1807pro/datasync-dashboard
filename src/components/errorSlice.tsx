'use client'
export default function ErrorState({ message = 'Something went wrong', onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="p-6 bg-card border border-theme rounded shadow text-center">
      <p className="text-red-600 font-semibold">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-accent text-white rounded hover:bg-accent-2 transition"
        >
          Retry
        </button>
      )}
    </div>
  )
}