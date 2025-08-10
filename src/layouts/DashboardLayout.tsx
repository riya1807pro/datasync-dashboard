'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: any) {
   const { isSignedIn } = useUser()

  useEffect(() => {
    if (!isSignedIn) {
      const interval = setInterval(() => {
        alert('Sign in to personalize your experience with favorites and settings.')
      }, 2 * 60 * 1000) // every 2 minutes

      return () => clearInterval(interval)
    }
  }, [isSignedIn])
  return (
    <div>
     <nav className="bg-white dark:bg-gray-900 text-black dark:text-white">
  <Navbar/>
</nav>
      <div className="flex pt-14">
        <main className="flex-1 ml-0  bg-gray-100 min-h-screen p-4">
          {children}
        </main>
      </div>
    </div>
  )
}