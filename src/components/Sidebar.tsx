import Link from 'next/link'
import { useRouter } from 'next/router'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/Movie' },
  { name: 'News', path: '/News' },
  { name: 'Social', path: '/Social' },
]

export default function Sidebar() {
  const router = useRouter()

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4 overflow-hidden">
      <h2 className="text-xl font-bold mb-6">DashSync</h2>
      <ul className="space-y-4">
        {navLinks.map(link => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                router.pathname === link.path ? 'bg-gray-700' : ''
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
