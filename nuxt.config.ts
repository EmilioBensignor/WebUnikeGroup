// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    // Fontaine
    // Booster
    // Vitalizer
    // GTM
    '@nuxtjs/tailwindcss',
    '@nuxtjs/seo',
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/images/Unike-Group-Logo.svg' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ''
    },
  },
  site: {
    url: 'https://unikegroup.com.ar',
    name: 'Unike Group',
    description: 'Innovación y tecnología aplicada al desarrollo de productos de vanguardia. · Tanques, cisternas, biodigestores y accesorios para garantizar la mejor agua.',
    defaultLocale: 'es'
  },
  seo: {
    fallbackTitle: false,
    // Chequear
    redirectToCanonicalSiteUrl: false
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800],
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['material-symbols']
  },
})