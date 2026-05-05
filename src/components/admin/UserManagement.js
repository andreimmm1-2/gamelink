'use client'

import React, { useEffect, useState } from 'react'
import { hasPermission } from '../../lib/admin'

export default function UserManagement({ user }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    loadUsers()
  }, [search, selectedRole])

  async function loadUsers() {
    if (!hasPermission(user.role, 'viewUsers')) {
      return
    }

    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (selectedRole) params.append('role', selectedRole)

      const res = await fetch(`/api/admin/users?${params}`)
      const data = await res.json()
      if (res.ok) {
        setUsers(data.users || [])
      }
    } catch (err) {
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }

  async function deleteUser(userId) {
    if (!hasPermission(user.role, 'deleteUsers')) {
      alert('You do not have permission to delete users')
      return
    }

    if (!confirm('Are you sure? This cannot be undone.')) return

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId))
      }
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  if (!hasPermission(user.role, 'viewUsers')) {
    return <div className="text-red-400">You do not have permission to view users.</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
        <p className="text-slate-400">Manage platform users and their roles</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="staff">Staff</option>
          <option value="staff-manager">Staff Manager</option>
          <option value="co-owner">Co-owner</option>
          <option value="owner">Owner</option>
        </select>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-400">No users found</p>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Username</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Joined</th>
                {hasPermission(user.role, 'deleteUsers') && (
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4 text-white font-medium">@{u.username}</td>
                  <td className="px-6 py-4 text-slate-400">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/20 text-purple-400 capitalize">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  {hasPermission(user.role, 'deleteUsers') && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
