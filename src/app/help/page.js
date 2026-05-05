'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I create an account?',
        a: 'Click the "Sign Up" button on the homepage and fill in your username, email, and password. Once verified, you can start creating game profiles!'
      },
      {
        q: 'How do I create a game profile?',
        a: 'Go to your Dashboard and click "Create Profile". Select your game, add your in-game name, description, and availability. Others can then see your profile!'
      },
      {
        q: 'What games are supported?',
        a: 'Currently we support Roblox, Minecraft, Fortnite, and AmongUs. We\'re adding more games regularly!'
      }
    ]
  },
  {
    category: 'Discovery & Messaging',
    items: [
      {
        q: 'How do I find other players?',
        a: 'Visit the Discover section or click on any game. You can search by username, in-game name, or filter by timezone and availability.'
      },
      {
        q: 'How do I message someone?',
        a: 'View their profile and click "Add Friend". Once they accept, you can start chatting through the Messages section.'
      },
      {
        q: 'Can I block users?',
        a: 'Yes, go to Settings → Privacy and manage your blocked users list.'
      }
    ]
  },
  {
    category: 'Account & Security',
    items: [
      {
        q: 'How do I change my password?',
        a: 'Go to Settings → Change Password. Enter your current password and your new password.'
      },
      {
        q: 'How do I delete my account?',
        a: 'Go to Settings → Danger Zone and click "Delete Account". This action cannot be undone.'
      },
      {
        q: 'Is my data safe?',
        a: 'Yes, we use industry-standard encryption and security practices. Check our Privacy Policy for more details.'
      }
    ]
  },
  {
    category: 'Promotions & Servers',
    items: [
      {
        q: 'How do I promote my server?',
        a: 'Contact our admin team for promotion opportunities. Visit the Tickets section to submit your request.'
      },
      {
        q: 'Are featured servers free?',
        a: 'Featured placement is available to quality servers. Contact us for pricing details.'
      }
    ]
  }
]

export default function HelpPage() {
  const [openCategory, setOpenCategory] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Header */}
      <section className="border-b border-slate-700 py-12">
        <div className="container">
          <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
            ← Back
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Help & Support</h1>
          <p className="text-slate-400 text-lg">Find answers to common questions or get in touch with our support team</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-b border-slate-700">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="#contact" className="group">
              <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-lg p-6 transition">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="text-white font-semibold group-hover:text-purple-400">Contact Support</h3>
                <p className="text-slate-400 text-sm mt-1">Get help from our team</p>
              </div>
            </Link>

            <a href="/tos" className="group">
              <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-lg p-6 transition">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-white font-semibold group-hover:text-purple-400">Terms of Service</h3>
                <p className="text-slate-400 text-sm mt-1">Our usage agreements</p>
              </div>
            </a>

            <a href="/privacy" className="group">
              <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-lg p-6 transition">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-white font-semibold group-hover:text-purple-400">Privacy Policy</h3>
                <p className="text-slate-400 text-sm mt-1">How we protect your data</p>
              </div>
            </a>

            <a href="/tickets" className="group">
              <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-lg p-6 transition">
                <div className="text-3xl mb-3">🎫</div>
                <h3 className="text-white font-semibold group-hover:text-purple-400">Support Tickets</h3>
                <p className="text-slate-400 text-sm mt-1">Track your requests</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Categories */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden sticky top-24">
                {FAQS.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setOpenCategory(idx)}
                    className={`w-full text-left px-4 py-3 transition border-b border-slate-700 last:border-b-0 ${
                      openCategory === idx
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="lg:col-span-2 space-y-4">
              {FAQS[openCategory]?.items.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 text-left hover:bg-slate-700 transition flex items-center justify-between"
                  >
                    <p className="font-semibold text-white">{faq.q}</p>
                    <span className="text-purple-400">
                      {openFaq === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 py-4 border-t border-slate-700 text-slate-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 border-t border-slate-700">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Can't Find What You're Looking For?</h2>

            <form className="bg-slate-800 border border-slate-700 rounded-lg p-8">
              <div className="mb-6">
                <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-slate-300 text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>

              <div className="mb-6">
                <label className="block text-slate-300 text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 border-t border-slate-700">
        <div className="container text-center">
          <p className="text-slate-400 mb-6">Connect with us on social media</p>
          <div className="flex gap-6 justify-center">
            <a href="#" className="text-slate-400 hover:text-purple-400 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-purple-400 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
