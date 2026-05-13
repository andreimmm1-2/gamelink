import React from 'react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-6xl font-black text-white mb-6">About GameLink</h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              GameLink is dedicated to connecting gamers from around the world. We provide a platform where players can find teammates, create profiles, join tournaments, and build gaming communities.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">What We Do</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              GameLink enables gamers to:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li>✓ Create and manage gaming profiles across multiple games</li>
              <li>✓ Discover and connect with other players</li>
              <li>✓ Form teams and squads with compatible players</li>
              <li>✓ Participate in tournaments and challenges</li>
              <li>✓ Build gaming communities and clans</li>
              <li>✓ Track achievements and statistics</li>
            </ul>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-slate-300 text-lg">
              Have questions or feedback? Contact us at <Link href="/contact" className="text-indigo-400 hover:text-indigo-300">support@gamelink.com</Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
