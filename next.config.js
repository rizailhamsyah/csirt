/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['three-globe', 'three'],
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    return config;
  },
  turbopack: {},
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          }
        ]
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://*.googleapis.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.googleapis.com; img-src 'self' data: https: https://*.googleapis.com https://*.gstatic.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https: https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://*.googleapis.com; frame-src 'self' blob: https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://*.googleapis.com; object-src 'none'; base-uri 'self'; form-action 'self';"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
          }
        ]
      },
      // Headers khusus untuk file download (.asc, .pdf, dll)
      {
        source: '/:path*.asc',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pgp-keys'
          },
          {
            key: 'Content-Disposition',
            value: 'attachment'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*.pdf',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
};
module.exports = nextConfig