import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/default/02/04.php',
        destination: '/business/poetry',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'kbiqianmvaesmnragbni.supabase.co' },
    ],
  },
};

export default nextConfig;
