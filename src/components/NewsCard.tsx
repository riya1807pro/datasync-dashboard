
export default function NewsCard({ article }:any) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
<img
  src={article.urlToImage || "/newsBg.jpg"}
  alt={article.title}
  className="w-full h-48 object-cover rounded"
  onError={(e) => {
    e.currentTarget.src = "/newsBg.jpg"
  }}
/>
    <h2 className="text-lg font-bold mt-2">{article.title || "Untitled"}</h2>
<p className="text-sm text-gray-600">{article.description || "No description available."}</p>

      <a href={article.url} target="_blank" className="text-blue-500 text-sm mt-2 inline-block">
        Read more →
      </a>
    </div>
  )
}
