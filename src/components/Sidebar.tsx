'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Film, Newspaper, Home, Users } from 'lucide-react'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import classNames from 'classnames'

const navLinks = [
  { name: 'Home', path: '/', icon: <Home size={18} /> },
  { name: 'Movies', path: '/Movie', icon: <Film size={18} /> },
  { name: 'News', path: '/News', icon: <Newspaper size={18} /> },
  { name: 'Favorites', path: '/Favorite', icon: <Users size={18} /> },
  { name: 'Settings', path: '/setting', icon: <Users size={18} /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [width, setWidth] = useState(250)

  const toggleCollapse = () => setCollapsed(!collapsed)

  return (
    <>
      {/* Toggle Button (always visible) */}
      <button
        className="fixed top-2 left-2 z-50 bg-gray-200 text-white p-2 rounded"
        onClick={toggleCollapse}
      >
        {collapsed ? <Menu size={18} /> : <X size={18} />}
      </button>

      {/* Sidebar */}
      <ResizableBox
        width={collapsed ? 64 : width}
        height={Infinity}
        axis="x"
        minConstraints={[64, 0]}
        maxConstraints={[400, 0]}
        resizeHandles={['e']}
        onResizeStop={(e, data) => {
          setWidth(data.size.width)
        }}
        className="fixed top-0 left-0 h-screen z-40 bg-gray-200 text-white transition-all ease-in-out duration-300 overflow-hidden"
      >
        <div className={classNames('h-full flex flex-col', collapsed ? 'w-16' : 'w-full')}>
          <div className="p-4 text-xl font-bold border-b border-gray-700">
            {collapsed ? 'D' : 'DashSync'}
          </div>
          <ul className="flex-1 p-4 space-y-2">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={classNames(
                    'flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-700 transition-colors',
                    pathname === link.path && 'bg-gray-700',
                    collapsed && 'justify-center'
                  )}
                >
                  {link.icon}
                  {!collapsed && <span>{link.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ResizableBox>
    </>
  )
}
