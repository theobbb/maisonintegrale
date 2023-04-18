/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
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
