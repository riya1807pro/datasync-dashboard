'use client'
import DashboardLayout from '@/layouts/DashboardLayout'

export default function Home() {
  return (
    <DashboardLayout>
      <div className="bg-card rounded shadow p-8">
        <h1 className="text-3xl font-bold accent mb-4">Welcome to DashSync</h1>
        <p className="text-muted text-lg">Your dashboard for movies, news, and favorites. Use the navigation above to explore!</p>
      </div>
    </DashboardLayout>
  )
}
