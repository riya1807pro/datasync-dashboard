'use client'
import Navbar from '@/components/Navbar'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: any) {
  const { isSignedIn } = useUser()

  useEffect(() => {
    if (!isSignedIn) {
      const interval = setInterval(() => {
        alert('Sign in to personalize your experience with favorites and settings.')
      }, 2 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [isSignedIn])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
<<<<<<< HEAD
      <div className="flex pt-14">
        
        <main className="flex-1 ml-0 p-4">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
=======
      <main className="pt-16 px-4 max-w-7xl mx-auto">{children}</main>
>>>>>>> 3f1c363bb1e3c0938fb63bc0fb6bee5aeca32484
    </div>
  )
}