import React from 'react'
import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last updated: May 2026</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-slate-300">By accessing and using GameLink, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-3">2. Use of Service</h2>
            <p className="text-slate-300">You agree to use GameLink only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of GameLink.</p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-3">3. User Conduct</h2>
            <p className="text-slate-300">You agree not to engage in any of the following prohibited behavior:</p>
            <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
              <li>Harassing or causing distress or inconvenience to any person</li>
              <li>Obscene or abusive language</li>
              <li>Disrupting the normal flow of dialogue</li>
              <li>Cheating, hacking, or exploiting</li>
            </ul>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-3">4. Limitation of Liability</h2>
            <p className="text-slate-300">GameLink shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
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
