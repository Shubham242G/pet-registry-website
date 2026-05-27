import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    localPatterns: [
      { pathname: '/images/**' }
    ]
  },
  // Add this async rewrites function to proxy API requests to your backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to your backend on port 5000
      },
    ];
  },
};

export default nextConfig;