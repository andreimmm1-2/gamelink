'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('andrei@gamelink.admin')
  const [ownerCode, setOwnerCode] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAdminLogin(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (!adminEmail.includes('@gamelink.admin')) {
        setError('Admin email must be @gamelink.admin')
        return
      }

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function requestOwnerCode() {
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/owner-request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: ownerEmail })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to request code')
        return
      }

      setMessage('Code requested. Check the server console or email.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function submitOwnerCode(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/owner-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: ownerEmail, code: ownerCode })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-2xl font-bold text-white">GameLink Admin</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-slate-400 text-sm mb-6">Access the admin control panel.</p>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  placeholder="admin@gamelink.admin"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50 mt-2"
              >
                {loading ? 'Logging in...' : 'Login to Admin Panel'}
              </button>
            </form>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Owner Login</h2>
            <p className="text-slate-400 text-sm mb-6">Request a verification code, then sign in as the owner.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <input
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={requestOwnerCode}
                disabled={loading}
                className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg font-semibold transition disabled:opacity-50"
              >
                Request Code
              </button>

              <form onSubmit={submitOwnerCode} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Verification Code</label>
                  <input
                    value={ownerCode}
                    onChange={(e) => setOwnerCode(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-black rounded-lg font-semibold transition disabled:opacity-50"
                >
                  Submit Code
                </button>
              </form>
            </div>
          </div>
        </div>

        {(error || message) && (
          <div className={`mt-6 p-4 rounded-lg border ${error ? 'bg-red-600/20 border-red-500/50 text-red-400' : 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'}`}>
            {error || message}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm">
            Back to GameLink
          </Link>
        </div>
      </div>
    </main>
  )
}
