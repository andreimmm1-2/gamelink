import Link from 'next/link'

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="container py-12">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
          ← Back
        </Link>
        
        <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>
          
          <div className="text-slate-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small files stored on your device that contain information about your browsing preferences. We use cookies to enhance your experience on GameLink.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                  <p>Required for authentication and basic functionality. These cannot be disabled.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Functional Cookies</h3>
                  <p>Remember your preferences and settings to provide a better experience.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Analytical Cookies</h3>
                  <p>Help us understand how you use GameLink to improve our service.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
              <p>
                Most browsers allow you to control cookies through your browser settings. You can set your browser to refuse cookies or alert you when cookies are being sent. Note that disabling certain cookies may affect the functionality of GameLink.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Clear Cookie Data</h2>
              <p>
                You can clear your cookie data from GameLink at any time through your browser settings or our Settings page. This will remove all stored preferences and authentication data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at privacy@gamelink.com
              </p>
            </section>

            <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-6 mt-8">
              <p className="text-slate-400 text-sm">
                Last updated: May 5, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
