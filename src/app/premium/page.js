'use client'

import React, { useState } from 'react'

export default function PremiumMembershipPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">👑 Premium Membership</h1>
        <p className="text-slate-400 mb-8">Unlock exclusive features and benefits</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Standard</h3>
            <div className="text-4xl font-black text-indigo-400 mb-4">Free</div>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li>✓ Basic profile</li>
              <li>✓ Find players</li>
              <li>✓ Join teams</li>
            </ul>
            <button className="w-full px-6 py-2 bg-slate-700 text-white font-bold rounded-lg">Current Plan</button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-500 rounded-lg p-8 text-center">
            <div className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">POPULAR</div>
            <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
            <div className="text-4xl font-black text-indigo-400 mb-4">$9.99<span className="text-lg text-slate-400">/mo</span></div>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li>✓ Everything in Standard</li>
              <li>✓ Advanced filters</li>
              <li>✓ Priority support</li>
              <li>✓ Ad-free browsing</li>
            </ul>
            <button className="w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Upgrade</button>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Elite</h3>
            <div className="text-4xl font-black text-indigo-400 mb-4">$19.99<span className="text-lg text-slate-400">/mo</span></div>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li>✓ Everything in Pro</li>
              <li>✓ Coaching sessions</li>
              <li>✓ Custom badge</li>
              <li>✓ Early access</li>
            </ul>
            <button className="w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition">Upgrade</button>
          </div>
        </div>
      </div>
    </main>
  )
}
