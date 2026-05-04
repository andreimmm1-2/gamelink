"use client"
import React from 'react'

export default function Button({ children, className = '', ...props }) {
  return (
    <button {...props} className={`px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white ${className}`}>
      {children}
    </button>
  )
}
