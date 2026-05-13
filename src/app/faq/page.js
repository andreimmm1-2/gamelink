import React from 'react'
import Link from 'next/link'

export default function FAQPage() {
  const faqs = [
    {
      q: 'How do I create a gaming profile?',
      a: 'Go to your dashboard and click "Create New Profile". Fill in your game, in-game name, and playstyle information.'
    },
    {
      q: 'How do I find players to team up with?',
      a: 'Visit the Find Players or Find Teammates pages to browse profiles filtered by game, playstyle, and availability.'
    },
    {
      q: 'Can I manage multiple game profiles?',
      a: 'Yes! You can create profiles for different games you play. Each profile can have different settings and availability.'
    },
    {
      q: 'How do tournaments work?',
      a: 'You can create or join tournaments. Tournaments have brackets and winners earn badges and rewards.'
    },
    {
      q: 'Is GameLink free to use?',
      a: 'Yes, GameLink is free for all players. Some premium features may be available in the future.'
    },
    {
      q: 'How do I report a player?',
      a: 'You can report inappropriate behavior from any player profile. Our moderation team reviews all reports.'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-6xl font-black text-white mb-2">FAQ</h1>
        <p className="text-slate-400 mb-12">Frequently Asked Questions</p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6 cursor-pointer hover:border-slate-600 transition">
              <summary className="font-bold text-white text-lg">{faq.q}</summary>
              <p className="text-slate-300 mt-4 ml-4">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-indigo-600/20 border border-indigo-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Didn't find your answer?</h2>
          <p className="text-slate-300 mb-6">Check out our help section or contact support</p>
          <Link href="/help" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block transition">
            Get Help
          </Link>
        </div>
      </div>
    </main>
  )
}
