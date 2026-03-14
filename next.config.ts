import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export
  },
  // Disable x-powered-by header
  poweredByHeader: false,
}

export default nextConfig
