'use client'

import React, { useState } from 'react'

export default function ReferralSystemPage() {
  const [referrals, setReferrals] = useState([])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">🔗 Referral System</h1>
        <p className="text-slate-400 mb-8">Earn rewards by referring friends</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Your Referral Link</h2>
          <div className="flex gap-2">
            <input type="text" value="https://gamelink.io/ref/your-code" className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" readOnly />
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Copy</button>
          </div>
        </div>

        {referrals.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">🔗</div>
            <h2 className="text-2xl font-bold text-white mb-2">No referrals yet</h2>
            <p className="text-slate-400">Share your code to earn rewards</p>
          </div>
        ) : (
          <div className="space-y-3">Referral listings</div>
        )}
      </div>
    </main>
  )
}
