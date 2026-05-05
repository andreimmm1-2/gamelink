'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '../../components/ui/Button'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Login failed')
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-600 border-opacity-30">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
          <p className="text-gray-400 text-center mb-8">Sign in to your GameLink account</p>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-400 px-4 py-2 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 border-opacity-30 focus:outline-none focus:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 border-opacity-30 focus:outline-none focus:border-slate-600"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-gray-400 text-center mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-slate-400 hover:text-slate-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
