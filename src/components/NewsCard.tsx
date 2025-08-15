// src/components/NewsCard.tsx
'use client'
import React from 'react'

type Props = {
  article: any
  onOpen: (a: any) => void
}

export default function NewsCard({ article }: any) {
  return (
    <div className="bg-card border border-theme rounded shadow p-4 flex flex-col">
      <h3 className="text-lg font-bold accent mb-2">{article.title}</h3>
      <p className="text-sm text-muted">{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm accent underline">
        Read more
      </a>
    </div>
  )
}
