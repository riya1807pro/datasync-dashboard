'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { UserButton, SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'soft-dark'>('light')
  const { isSignedIn } = useUser()

  useEffect(() => {
    const saved = localStorage.getItem('dashsync_theme')

    if (saved === 'soft-dark') {
      document.documentElement.setAttribute('data-theme', 'soft-dark')
      setTheme('soft-dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'soft-dark' : 'light'
    setTheme(next)
    if (next === 'soft-dark') {
      document.documentElement.setAttribute('data-theme', 'soft-dark')
      localStorage.setItem('dashsync_theme', 'soft-dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('dashsync_theme', 'light')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-card border-b border-theme z-50 px-4 flex items-center justify-between">
      {/* Logo */}
        <span className="text-xl font-bold accent">🚀 DashSync</span>

      {/* Menu Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/Movie" className="hover:underline">Movies</Link>
        <Link href="/News" className="hover:underline">News</Link>
        <Link href="/Favorite" className="hover:underline">Favorites</Link>
        <Link href="/setting" className="hover:underline">Settings</Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-accent-2/10 transition"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

      {
          isSignedIn ? (
            <UserButton/>
          ) : (
            <SignInButton mode="modal">Sign In</SignInButton>
          )
      }
      </div>
    </nav>
  )
}