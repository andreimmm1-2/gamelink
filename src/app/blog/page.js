'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    try {
      // Fetch real blog posts from API
      const res = await fetch('/api/blog')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (err) {
      console.error('Error loading blog posts:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black text-white mb-2">📰 Blog</h1>
        <p className="text-slate-400 mb-8">Latest news and updates from GameLink</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-5xl mb-3">📝</div>
            <h2 className="text-2xl font-bold text-white mb-2">No blog posts yet</h2>
            <p className="text-slate-400">Check back soon for gaming news and updates!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-indigo-500 transition">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-white flex-1">{post.title}</h2>
                    <span className="text-sm text-slate-400 whitespace-nowrap ml-4">{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-300 mb-3">{post.excerpt || post.content?.substring(0, 150)}</p>
                  <button className="text-indigo-400 hover:text-indigo-300 font-bold">Read More →</button>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
