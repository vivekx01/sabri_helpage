import './globals.css'

export const metadata = {
  title: 'Sabri Helpage',
  description: 'Serving society for more than a decade',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
