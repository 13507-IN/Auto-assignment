/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@google-cloud/local-auth', 'googleapis'],
  },
  webpack: (config, { isServer, webpack }) => {
    // Client-side specific fallbacks and polyfills
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Essential fallbacks
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,

        // Polyfilled modules
        events: require.resolve('events/'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        zlib: require.resolve('browserify-zlib'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        vm: require.resolve('vm-browserify'),
        querystring: require.resolve('querystring-es3'),
      };

      // Handle node: protocol aliases for the client bundle only
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:events': 'events',
        'node:path': 'path-browserify',
        'node:crypto': 'crypto-browserify',
        'node:stream': 'stream-browserify',
        'node:buffer': 'buffer',
        'node:fs': false,
        'node:net': false,
        'node:tls': false,
      };

      // Add browser polyfills for the client bundle only
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }

    return config;
  },
};

export default nextConfig;
