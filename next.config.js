/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    // Pastikan three-globe tidak di-bundle untuk SSR (hanya untuk server-side)
    // Ini mencegah WebGL context error di Docker container saat build
    // Referensi: https://discourse.threejs.org/t/why-is-threejs-not-working-on-docker/44100
    if (isServer) {
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push({
          'three': 'commonjs three',
          'three-globe': 'commonjs three-globe',
          '@react-three/fiber': 'commonjs @react-three/fiber',
          '@react-three/drei': 'commonjs @react-three/drei',
        });
      } else if (typeof config.externals === 'object') {
        config.externals = [
          config.externals,
          {
            'three': 'commonjs three',
            'three-globe': 'commonjs three-globe',
            '@react-three/fiber': 'commonjs @react-three/fiber',
            '@react-three/drei': 'commonjs @react-three/drei',
          }
        ];
      }
    }
    
    // Untuk client-side, pastikan three-globe di-bundle dengan benar
    // Jangan split chunks untuk three-globe agar lebih mudah di-load
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Jangan split three-globe, biarkan di-bundle dengan chunk utama atau async
            default: {
              ...config.optimization.splitChunks?.cacheGroups?.default,
              minChunks: 1,
            },
          },
        },
      };
    }
    
    return config;
  },
  turbopack: {},
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https: https://www.youtube.com https://www.youtube-nocookie.com; frame-src 'self' blob: https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'self';"
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
      }
    ]
  }
};
module.exports = nextConfig