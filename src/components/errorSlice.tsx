// src/components/ErrorState.tsx
'use client'
import React from 'react'

export default function ErrorState({ message = 'Something went wrong', onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="p-6 bg-white rounded shadow text-center">
      <p className="text-red-600 font-semibold">{message}</p>
      {onRetry && <button onClick={onRetry} className="mt-3 px-4 py-2 bg-black text-white rounded">Retry</button>}
    </div>
  )
}