'use client'

import React, { useState } from 'react'

export default function VerificationPage() {
  const [verified, setVerified] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">✅ Account Verification</h1>
        <p className="text-slate-400 mb-8">Verify your account to unlock features</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          {!verified ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Verification Steps</h2>
                <ol className="space-y-3 text-slate-300">
                  <li className="flex items-start"><span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">1</span> Email confirmation</li>
                  <li className="flex items-start"><span className="bg-slate-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">2</span> Phone verification</li>
                  <li className="flex items-start"><span className="bg-slate-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">3</span> Complete profile</li>
                </ol>
              </div>
              <button onClick={() => setVerified(true)} className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Start Verification</button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-2">Account Verified!</h3>
              <p className="text-slate-400">All features unlocked</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
