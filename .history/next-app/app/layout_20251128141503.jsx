import './globals.css'

export const metadata = {
  title: 'Sabri Helpage - Next (migration)'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="min-h-screen font-sans bg-white text-gray-800">
          {children}
        </div>
      </body>
    </html>
  )
}
