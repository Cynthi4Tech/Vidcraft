import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vidcraft - AI Video Generator',
  description: 'Generate quality videos from text with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}