import './globals.css'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'

export const metadata = {
  title: 'Sabri Helpage - Next (migration)'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="min-h-screen font-sans bg-white text-gray-800">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
