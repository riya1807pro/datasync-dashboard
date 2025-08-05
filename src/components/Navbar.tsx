'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings, Heart, Home, Film, Newspaper, Users } from 'lucide-react'
import { useUser, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'

const navItems = [
  { label: 'Home', path: '/', icon: <Home size={18} /> },
  { label: 'Movies', path: '/Movie', icon: <Film size={18} /> },
  { label: 'News', path: '/News', icon: <Newspaper size={18} /> },
  { label: 'Social', path: '/Social', icon: <Users size={18} /> },
  { label: 'Favorites', path: '/Favorite', icon: <Heart size={18} /> },
  { label: 'Settings', path: '/setting', icon: <Settings size={18} /> },
]

export default function Navbar() {
  const pathname = usePathname()
  const { isSignedIn } = useUser()

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white shadow z-50 px-4 flex items-center justify-between">
      <div className="text-xl font-bold">🚀 DashSync</div>

      <ul className="flex gap-4 items-center">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-200 transition ${
                pathname === item.path ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          </li>
        ))}
{/* ✅ Auth Section */}
<li className="ml-2">
  {isSignedIn ? (
    <UserButton afterSignOutUrl="/" />
  ) : (
    <div className="flex gap-2">
      <Link href="/SignIn">
        <button className="px-3 py-1 rounded border hover:bg-gray-100">Sign In</button>
      </Link>
      <Link href="/SignUp">
        <button className="px-3 py-1 rounded border hover:bg-gray-100">Sign Up</button>
      </Link>
    </div>
  )}
</li>
      </ul>
    </nav>
  )
}