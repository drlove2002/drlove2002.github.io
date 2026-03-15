import type { Metadata } from 'next'
import { Space_Mono, Lora, JetBrains_Mono } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sudip Roy',
  alternateName: 'drlove',
  url: 'https://drlove.dev',
  email: 'sudiproy20yo@gmail.com',
  image: 'https://drlove.dev/pfp.png',
  jobTitle: 'Software Engineer',
  description:
    'Systems engineer from West Bengal, India. Co-founder of Worldwide Discord (50k members). Backend engineer specialising in Rust, Python, and distributed systems.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Calcutta',
  },
  knowsAbout: [
    'Rust',
    'Python',
    'gRPC',
    'PostgreSQL',
    'Redis',
    'Discord API',
    'Systems Engineering',
    'Virtual Economy Design',
    'Distributed Systems',
  ],
  sameAs: [
    'https://github.com/drlove2002',
    'https://linkedin.com/in/drlove2002',
    'https://x.com/drlove_2002',
  ],
}

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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://drlove.dev',
    siteName: 'drlove.dev',
    title: 'Sudip Roy — drlove',
    description:
      'Systems engineer. Built a Discord bot serving 50k members over 5 years. Python + Rust + gRPC + libSQL.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Sudip Roy — drlove.dev — I build systems people live inside.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sudip Roy — drlove',
    description: 'Systems engineer. Built infrastructure that 50k people live inside.',
    images: ['/og-image.svg'],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
