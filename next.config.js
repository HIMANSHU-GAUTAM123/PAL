/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/api/auth/register',
        permanent: true,
      },
    ];
  },

  images: {
    domains: ['gravatar.com'], // Add gravatar.com here
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Resolve aliases
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    if (!isServer) {
      config.externals.push({
        canvas: 'commonjs canvas',
      });
    }

    // Add rule for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
