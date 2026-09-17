import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Old/direct Stitch URL → clean root
        source: "/stitch/landing.html",
        destination: "/",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
