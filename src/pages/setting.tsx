// src/pages/setting.tsx
'use client'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, setLanguage } from '@/features/user/userSlice'
import { RootState } from '@/store'

export default function SettingsPage() {
  const dispatch = useDispatch()
  const { theme, language } = useSelector((state: RootState) => state.userPreferences)

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value))
    if (e.target.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value))
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8 bg-white dark:bg-gray-900 rounded">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">⚙ Settings</h1>

        {/* Theme */}
        <div>
          <label className="block font-semibold mb-2">Theme</label>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="border p-2 rounded w-52"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block font-semibold mb-2">Language</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border p-2 rounded w-52"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        {/* Saved Items */}
        <div>
          <label className="block font-semibold mb-2">Saved Items</label>
          <button
            onClick={() => alert('Show saved movies & news here')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            See Saved
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}