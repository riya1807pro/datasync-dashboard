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
      <main className="pt-16 px-4 max-w-7xl mx-auto">{children}</main>
    </div>
  )
}