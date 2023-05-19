const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://maisonintegrale.sanity.studio',
        permanent: false,
        basePath: false
      },
    ]
  },
  async rewrites() {
    return [
        {
          source: '/en/approach',
          destination: '/en/approche',
          locale: false
        },
        {
          source: '/en/services',
          destination: '/en/services',
          locale: false
        }, 
        {
          source: '/en/work',
          destination: '/en/realisations',
          locale: false
        },
        {
          source: '/en/work/:slug',
          destination: '/en/realisations/:slug',
          locale: false
        },
        /*
        {
          source: '/en/work',
          destination: '/en/projets',
          locale: false
        },
        {
          source: '/en/work/:slug',
          destination: '/en/projets/:slug',
          locale: false
        },   */
        {
          source: '/en/team',
          destination: '/en/equipe',
          locale: false
        },
        {
          source: '/en/contact',
          destination: '/en/contact',
          locale: false
        },
    ]
  }
}

module.exports = nextConfig
