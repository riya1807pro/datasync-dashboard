'use client'
import React from 'react'

type Props = { children: React.ReactNode }

export class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: any, info: any) {
    console.error('[ErrorBoundary]', error, info)
    // optionally send to analytics / Sentry here
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-lg text-center bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-600 mb-4">Refresh or try again. If the problem persists, contact support.</p>
            <div className="flex gap-3 justify-center">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => location.reload()}>
                Reload
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary