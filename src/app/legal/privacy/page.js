import React from 'react'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: May 2026</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-3">Data Collection</h2>
            <p className="text-slate-300">We collect information you provide directly such as your name, email, and gaming profile information.</p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-3">Information Use</h2>
            <p className="text-slate-300">We use your information to provide and improve GameLink services, communicate with you, and personalize your experience.</p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-3">Information Protection</h2>
            <p className="text-slate-300">We implement appropriate technical and organizational measures to protect your personal information.</p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-3">Your Rights</h2>
            <p className="text-slate-300">You have the right to access, update, or delete your personal information at any time.</p>
          </section>

          <div className="mt-8 text-center">
            <Link href="/" className="text-indigo-400 hover:text-indigo-300 font-bold">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
