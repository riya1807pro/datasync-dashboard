// src/components/NewsModal.tsx
'use client'
import React, { useEffect } from 'react'

type Props = {
  article: any
  onClose: () => void
}

export default function NewsModal({ article, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded max-w-3xl w-full max-h-[90vh] overflow-auto p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 px-2 py-1 rounded bg-gray-200">Close</button>
        <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
        {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover rounded mb-4" />}
        <p className="text-gray-800 mb-4">{article.content || article.description || 'No content available'}</p>
        <a href={article.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open original article</a>
      </div>
    </div>
  )
}
