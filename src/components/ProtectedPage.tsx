'use client'
import { useUser, SignInButton } from '@clerk/nextjs'

export default function ProtectedPage({ children }:any) {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">Please sign in to access this page.</p>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-accent text-white rounded shadow">
            Sign In
          </button>
        </SignInButton>
      </div>
    )
  }

  return children
}