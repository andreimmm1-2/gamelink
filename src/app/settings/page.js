'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [bio, setBio] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const res = await fetch('/api/auth/me', { cache: 'no-store' })
      const data = await res.json()
      if (data.user) {
        setUser(data.user)
        setBio(data.user.bio || '')
      } else {
        router.push('/login')
      }
      setLoading(false)
    }
    loadUser()
  }, [router])

  async function updateBio(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio })
      })
      
      if (!res.ok) throw new Error('Failed to update bio')
      setSuccess('Bio updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  async function updatePassword(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update password')
      }
      
      setSuccess('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteAccount() {
    if (!window.confirm('Are you absolutely sure? This cannot be undone. Type "DELETE" to confirm.')) return
    
    const confirmation = window.prompt('Type DELETE to confirm account deletion:')
    if (confirmation !== 'DELETE') {
      setError('Confirmation failed')
      return
    }
    
    setDeleting(true)
    setError('')
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE'
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete account')
      }
      
      document.cookie = 'token=; Max-Age=0; path=/;'
      setTimeout(() => router.push('/'), 1000)
    } catch (err) {
      console.error('Delete account error:', err)
      setError(err.message || 'Failed to delete account. Please try again.')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
            ← Back
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === 'profile'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === 'password'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Change Password
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === 'privacy'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Privacy
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === 'notifications'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Notifications
                </button>
                <hr className="border-slate-700 my-4" />
                <button
                  onClick={() => setActiveTab('danger')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === 'danger'
                      ? 'bg-red-600 text-white'
                      : 'text-red-400 hover:bg-red-600/10'
                  }`}
                >
                  Danger Zone
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Alerts */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 text-red-400 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500 text-green-400 rounded-lg">
                {success}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                
                <div className="mb-8 pb-8 border-b border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Username</label>
                      <input
                        type="text"
                        value={user.username}
                        disabled
                        className="w-full bg-slate-700 text-slate-400 px-4 py-2 rounded-lg border border-slate-600 cursor-not-allowed"
                      />
                      <p className="text-xs text-slate-500 mt-1">Username cannot be changed</p>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full bg-slate-700 text-slate-400 px-4 py-2 rounded-lg border border-slate-600 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <form onSubmit={updateBio}>
                  <h3 className="text-lg font-semibold text-white mb-4">Bio</h3>
                  <div className="mb-4">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Tell others about yourself</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      maxLength={500}
                      rows={4}
                      className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                      placeholder="Your gaming style, interests, timezone..."
                    />
                    <p className="text-xs text-slate-500 mt-1">{bio.length}/500 characters</p>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
                  >
                    Save Bio
                  </button>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                <form onSubmit={updatePassword} className="max-w-md">
                  <div className="mb-4">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-slate-300 text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Profile Visibility</p>
                      <p className="text-slate-400 text-sm">Allow other players to view your profile</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Discovery</p>
                      <p className="text-slate-400 text-sm">Show in game discovery searches</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Friend Requests</p>
                      <p className="text-slate-400 text-sm">Allow friend requests from anyone</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Friend Requests</p>
                      <p className="text-slate-400 text-sm">Notify when someone sends you a request</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Messages</p>
                      <p className="text-slate-400 text-sm">Notify when you receive new messages</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-slate-400 text-sm">Send email updates about your account</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                </div>
              </div>
            )}

            {/* Danger Zone */}
            {activeTab === 'danger' && (
              <div className="bg-red-950/20 border border-red-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-red-400 mb-6">Danger Zone</h2>
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Delete Account</h3>
                  <p className="text-red-300 text-sm mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    onClick={deleteAccount}
                    disabled={deleting}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    {deleting ? 'Deleting...' : 'Delete Account'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
