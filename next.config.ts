import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    localPatterns: [
      { pathname: '/images/**' }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // ✅ Add /api/ to the destination
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;