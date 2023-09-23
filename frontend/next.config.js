/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          dimensions: false
        }
      }],
    });

    return config;
  },

  ...process.env.NODE_ENV === 'development' && {
    output: undefined,
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'http://127.0.0.1:8000/:path*',
        },
      ]
    },
    async redirects(){
      return [
        {
          source: '/',
          destination: '/init',
          permanent: false,
          missing: [
            {
              type: 'cookie',
              key: 'csrftoken'
            }
          ]
        },
      ]
    }
  }
}

module.exports = nextConfig
