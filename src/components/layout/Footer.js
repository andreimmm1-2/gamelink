import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 mt-8">
      <div className="container py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} GameLink — Find your squad</div>
    </footer>
  )
}
