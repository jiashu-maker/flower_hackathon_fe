import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dermatology AI Interface',
  description: 'AI-powered dermatology analysis interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-medical-gray min-h-screen">
        {children}
      </body>
    </html>
  )
}
