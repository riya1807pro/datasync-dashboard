'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: any) {
  return (
    <div>
      <Navbar />
      <div className="flex pt-14">
        <main className="flex-1 ml-0  bg-gray-100 min-h-screen p-4">
          {children}
        </main>
      </div>
    </div>
  )
}