import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <span className="text-lg font-bold text-white">GameLink</span>
            </div>
            <p className="text-slate-400 text-sm">
              Connect with gamers, find your squad, and play together.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/discover" className="text-slate-400 hover:text-slate-300 transition text-sm">Discover</Link></li>
              <li><Link href="/games/Roblox" className="text-slate-400 hover:text-slate-300 transition text-sm">Games</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-slate-300 transition text-sm">Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-slate-400 hover:text-slate-300 transition text-sm">Help Center</Link></li>
              <li><Link href="/tickets" className="text-slate-400 hover:text-slate-300 transition text-sm">Support Tickets</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-slate-300 transition text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/tos" className="text-slate-400 hover:text-slate-300 transition text-sm">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-slate-300 transition text-sm">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-slate-400 hover:text-slate-300 transition text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-700 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} GameLink. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-slate-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20v-7.5h-2.5v-2.5h2.5V7c0-2.07 1.26-3.2 3.11-3.2.88 0 1.64.06 1.86.1v2.15h-1.28c-1 0-1.19.48-1.19 1.18V10h2.38l-.31 2.5h-2.07V20z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
