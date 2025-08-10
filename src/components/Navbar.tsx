'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 🛠 Fix hydration mismatch issue
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-200 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-xl font-bold">My App</h1>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀ Light Mode'}
      </button>
    </nav>
  )
}