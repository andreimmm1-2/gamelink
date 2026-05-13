'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function TwoFactorPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enabled2FA, setEnabled2FA] = useState(false)
  const [qrCode, setQrCode] = useState(null)
  const [code, setCode] = useState('')
  const [backupCodes, setBackupCodes] = useState([])

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if (!data.user) {
        router.push('/login')
        return
      }
      setUser(data.user)
      // Check if 2FA is enabled
      const twoFARes = await fetch('/api/auth/2fa/status')
      const twoFAData = await twoFARes.json()
      setEnabled2FA(twoFAData.enabled || false)
    } catch (err) {
      console.error('Error loading user:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEnable2FA = async () => {
    try {
      const res = await fetch('/api/auth/2fa/setup', { method: 'POST' })
      const data = await res.json()
      setQrCode(data.qrCode)
    } catch (err) {
      console.error('Error enabling 2FA:', err)
    }
  }

  const handleVerify = async () => {
    try {
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      const data = await res.json()
      if (res.ok) {
        setEnabled2FA(true)
        setBackupCodes(data.backupCodes || [])
        setQrCode(null)
        setCode('')
        alert('2FA enabled successfully!')
      }
    } catch (err) {
      console.error('Error verifying 2FA:', err)
      alert('Invalid code. Try again.')
    }
  }

  if (loading) {
    return <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
    </main>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/settings/security" className="text-indigo-400 hover:text-indigo-300 text-sm mb-6 inline-block">← Back</Link>
        <h1 className="text-5xl font-black text-white mb-2">🔐 Two-Factor Authentication</h1>
        <p className="text-slate-400 mb-8">Add an extra layer of security to your account</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          {enabled2FA ? (
            <>
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-300 font-bold">✓ Two-Factor Authentication is enabled</p>
              </div>
              <button className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition">
                Disable 2FA
              </button>
            </>
          ) : (
            <>
              <p className="text-slate-300">Secure your account with two-factor authentication using an authenticator app.</p>
              
              {!qrCode ? (
                <button
                  onClick={handleEnable2FA}
                  className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition"
                >
                  Setup 2FA
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-white font-bold mb-3">Scan with your authenticator app:</p>
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <p className="text-gray-600">QR Code would display here</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    className="w-full px-4 py-2 text-center text-2xl tracking-widest bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    onClick={handleVerify}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
                  >
                    Verify & Enable
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
