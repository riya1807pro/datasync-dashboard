// src/pages/social.tsx
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetAllPostsQuery } from "@/features/social/SocialApi";

export default function SocialPage() {
  const { data, isLoading, error } = useGetAllPostsQuery(undefined);

  if (isLoading) return <DashboardLayout><p>Loading social posts...</p></DashboardLayout>;
  if (error) return <DashboardLayout><p>Error loading posts.</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">💬 Social Feed</h1>
      <ul className="space-y-4">
        {data?.map((post:any) => (
          <li key={post.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{post.title}</h3>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
}
