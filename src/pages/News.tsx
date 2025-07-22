// src/pages/news.tsx
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetTopHeadlinesQuery } from "@/features/news/newApi";

export default function NewsPage() {
  const { data, isLoading, error } = useGetTopHeadlinesQuery(undefined);

  if (isLoading) return <DashboardLayout><p>Loading...</p></DashboardLayout>;
  if (error) return <DashboardLayout><p>Error fetching news.</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">📰 Top Headlines</h1>
      <ul className="space-y-4 h-screen overflow-scroll fixed">
        {data?.articles?.map((article:any, index:number) => (
          <li key={index} className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500 mt-1">{article.description}</p>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
}
