'use client'
import { useGetTopHeadlinesQuery } from '@/features/news/newApi'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '@/features/news/NewsSlice'
import NewsCard from '@/components/NewsCard'

const categories = ['all', 'technology', 'business', 'sports', 'health', 'entertainment']

export default function NewsPage() {
  const category = useSelector((state: any) => state.news?.category)
  const dispatch = useDispatch()
  
  const selectedCategory = category === 'all' ? '' : category;
  const { data, isLoading } = useGetTopHeadlinesQuery(selectedCategory)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Top Headlines - {category}</h1>

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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {data?.articles?.map((article: any, i: number) => (
            <NewsCard article={article} key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
