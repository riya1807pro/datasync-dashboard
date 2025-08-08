// src/components/NewsCard.tsx
'use client'
import React from 'react'

type Props = {
  article: any
  onOpen: (a: any) => void
}

export default function NewsCard({ article, onOpen }: Props) {
  return (
    <div className="bg-white rounded shadow p-3 cursor-pointer hover:shadow-md" onClick={() => onOpen(article)}>
      <img src={article.urlToImage || '/newsBg.jpg'} alt={article.title} className="w-full h-40 object-cover rounded" />
      <h3 className="font-semibold mt-2 line-clamp-2">{article.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mt-1">{article.description}</p>
      <button className="text-blue-600 mt-2 text-sm">Read more</button>
    </div>
  )
}
