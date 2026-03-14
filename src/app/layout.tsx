import type { Metadata } from 'next'
import { Space_Mono, Lora, JetBrains_Mono } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import './globals.css'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://drlove.dev'),
  title: {
    default: 'Sudip Roy — drlove',
    template: '%s · drlove.dev',
  },
  description:
    'Sudip Roy (drlove) — CS student from West Bengal building systems at scale. Co-owner of Worldwide Discord (50k members), multi-language backend engineer, aspiring CTO.',
  keywords: [
    'Sudip Roy',
    'drlove',
    'drlove2002',
    'portfolio',
    'software engineer',
    'Rust',
    'Python',
    'Discord bot',
    'systems engineering',
  ],
  authors: [{ name: 'Sudip Roy', url: 'https://drlove.dev' }],
  creator: 'Sudip Roy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://drlove.dev',
    siteName: 'drlove.dev',
    title: 'Sudip Roy — drlove',
    description:
      'Systems engineer. Built a Discord bot serving 50k members over 5 years. Python + Rust + gRPC + libSQL.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sudip Roy — drlove',
    description: 'Systems engineer. Built infrastructure that 50k people live inside.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${lora.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
