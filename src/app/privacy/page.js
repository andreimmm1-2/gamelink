import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="container py-12">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
          ← Back
        </Link>
        
        <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="text-slate-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p>
                GameLink ("we", "us", "our", or "Company") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>Personal Data:</strong> Email address, username, password (hashed)</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns</li>
                <li><strong>Profile Data:</strong> In-game names, descriptions, availability</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Use of Data</h2>
              <p>GameLink uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>To provide and maintain the service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis and important information to improve our service</li>
                <li>To monitor the usage of our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the bottom of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@gamelink.com
              </p>
            </section>

            <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-6 mt-8">
              <p className="text-slate-400 text-sm">
                Effective Date: May 5, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
