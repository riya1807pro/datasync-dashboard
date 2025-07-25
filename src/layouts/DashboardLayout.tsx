// src/layouts/DashboardLayout.jsx
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }:any) {
  return (
    <div className="flex m-0 p-0 w-screen ">
      <Sidebar />
      <div className="flex-1 bg-gray-100 mt-10 min-h-screen">{children}</div>
    </div>
  )
}
