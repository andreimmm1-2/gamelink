import Link from 'next/link'

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="container py-12">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
          ← Back
        </Link>
        
        <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="text-slate-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using GameLink ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
              <p>
                When you create an account, you must provide information that is accurate, complete, and current. You are responsible for maintaining the confidentiality of your password and account. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Conduct</h2>
              <p>
                You agree that you will not use GameLink to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Post any material that is abusive, hateful, threatening, or defamatory</li>
                <li>Engage in any form of harassment or bullying</li>
                <li>Share spam, viruses, or malicious code</li>
                <li>Impersonate another person or entity</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
              <p>
                GameLink and its original content, features, and functionality are owned by GameLink, its creators, licensors, or other providers of such material and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p>
                GameLink shall not be liable for any damages arising from the use of or inability to use the materials on this website, even if GameLink or an authorized representative of this website has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Modifications to Terms</h2>
              <p>
                GameLink may revise these terms of service for this website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which GameLink operates, and you irrevocably submit to the exclusive jurisdiction of the courts located in that area.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at support@gamelink.com
              </p>
            </section>

            <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-6 mt-8">
              <p className="text-slate-400 text-sm">
                Last updated: May 5, 2026. By continuing to use GameLink, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
