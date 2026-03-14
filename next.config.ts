import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export
  },
  poweredByHeader: false,
  // Allow LAN access during development (e.g. testing on phone)
  allowedDevOrigins: ['192.168.1.0/24'],
}

export default nextConfig
