'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ReferralsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [referralCode, setReferralCode] = useState('')
  const [referrals, setReferrals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const userRes = await fetch('/api/auth/me')
      const userData = await userRes.json()
      if (!userData.user) {
        router.push('/login')
        return
      }
      setUser(userData.user)
      setReferralCode(`GL_${userData.user.id.substring(0, 8).toUpperCase()}`)

      const refRes = await fetch('/api/referrals')
      const refData = await refRes.json()
      setReferrals(refData.referrals || [])
    } catch (err) {
      console.error('Error loading referrals:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode)
    alert('Referral code copied!')
  }

  if (loading) {
    return <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
    </main>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🎁 Referral Program</h1>
        <p className="text-slate-400 mb-8">Invite friends and earn rewards</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Referral Code</h2>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-bold focus:outline-none"
              />
              <button
                onClick={copyCode}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition"
              >
                Copy
              </button>
            </div>
            <p className="text-slate-400 text-sm">Share this code with friends. You'll both earn rewards when they sign up!</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Rewards</h2>
            <div className="space-y-2">
              <div className="text-slate-300">✓ +50 GameLink Points per referral</div>
              <div className="text-slate-300">✓ Exclusive badges and cosmetics</div>
              <div className="text-slate-300">✓ Access to beta features</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Referrals ({referrals.length})</h2>
          {referrals.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No referrals yet. Share your code to get started!</p>
          ) : (
            <div className="space-y-3">
              {referrals.map((ref, idx) => (
                <div key={idx} className="bg-slate-700 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold">{ref.name}</p>
                    <p className="text-sm text-slate-400">Joined {ref.joinDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-400 font-bold">+50 Points ✓</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
