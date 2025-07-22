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
    <aside className="w-full h-10  bg-gray-900 text-white p-4 overflow-hidden absolute top-0 z-1">
      {/* <h2 className="text-xl font-bold ml-6">DashSync</h2> */}
      <ul className="space-x-4 flex flex-row  ">
        {navLinks.map(link => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`inline py-4 px-2 rounded hover:bg-gray-700 ${
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
