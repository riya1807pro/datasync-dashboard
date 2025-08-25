'use client'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '@/features/news/NewsSlice'
import { useGetTopHeadlinesQuery } from '@/features/news/newApi'
import DashboardLayout from '@/layouts/DashboardLayout'
import NewsCard from '@/components/NewsCard'
import NewsModal from '@/components/NewsModal'

const categories = ['all', 'technology', 'business', 'sports', 'health', 'entertainment']

export default function NewsPage() {
  const category = useSelector((state: any) => state.news?.category)
  const dispatch = useDispatch()

  const selectedCategory = category === 'all' ? 'general' : category

  const { data, isLoading, error } = useGetTopHeadlinesQuery(selectedCategory)

  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">📰 Top Headlines - {category}</h1>

        {/* category buttons */}
        <div className="flex gap-4 mb-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`px-3 py-1 rounded ${
                category === cat ? 'bg-black text-white' : 'bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* loading / error / data */}
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to load news 😢</p>}

        {!isLoading && !error && (
          <div className="grid md:grid-cols-3 gap-4">
            {data?.articles?.map((article: any, i: number) => (
              <NewsCard key={i} article={article} onOpen={setSelectedArticle} />
            ))}
          </div>
        )}

        {/* modal for selected article */}
        {selectedArticle && (
          <NewsModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </div>
    </DashboardLayout>
  )
}