import '../app/globals.css'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export const metadata = {
  title: 'GameLink',
  description: 'Find gaming friends and featured servers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
