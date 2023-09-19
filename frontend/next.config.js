/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  ...process.env.NODE_ENV === 'development' && {
    output: undefined,
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'http://localhost:8000/:path*',
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
