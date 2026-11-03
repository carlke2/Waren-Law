import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function mediaPattern() {
  const mediaUrl = process.env.PUBLIC_MEDIA_BASE_URL;
  if (!mediaUrl) throw new Error('PUBLIC_MEDIA_BASE_URL is not set');
  return new URL(`${mediaUrl.replace(/\/$/, '')}/**`);
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  turbopack: { root },
  outputFileTracingRoot: root,
  ...(process.env.NEXT_OUTPUT === 'standalone' ? { output: 'standalone' as const } : {}),
  async rewrites() {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw new Error('API_URL is not set');
    return [
      { source: '/api/v1/:path*/', destination: `${apiUrl.replace(/\/$/, '')}/api/v1/:path*` },
    ];
  },
  images: {
    remotePatterns: [mediaPattern()],
    dangerouslyAllowLocalIP: LOCAL_HOSTS.has(mediaPattern().hostname),
  },
};

export default nextConfig;
