import { createClient } from '@supabase/supabase-js'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/seo',
    '@nuxtjs/supabase'
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'format-detection', content: 'telephone-no' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/images/Unike-Group-Logo.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fxytgajevhfuzwlyaorb.supabase.co' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://web-unike-group.vercel.app',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
      supabase: {
        url: process.env.SUPABASE_URL
      }
    }
  },

  site: {
    url: 'https://web-unike-group.vercel.app',
    name: 'Waterplast - Unike Group',
    description:
      'En Unike Group desarrollamos soluciones innovadoras para el almacenamiento y tratamiento del agua en Argentina. Nuestros tanques Waterplast garantizan calidad, durabilidad y protección antibacteriana. Descubrí nuestra red de distribuidores y asesorate con nuestros expertos en soluciones hídricas sustentables.',
    defaultLocale: 'es'
  },

  seo: {
    fallbackTitle: false,
    redirectToCanonicalSiteUrl: false
  },

  sitemap: {
    urls: async () => {
      const supabaseUrl = process.env.SUPABASE_URL
      const supabaseKey = process.env.SUPABASE_KEY

      const urls: any[] = [
        { loc: '/', priority: 1.0 },
        { loc: '/waterplast', priority: 0.9 },
        { loc: '/blog', priority: 0.8 }
      ]

      if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Supabase credentials not available for sitemap')
        return urls
      }

      try {
        const { createClient } = await import('@supabase/supabase-js')
        const client = createClient(supabaseUrl, supabaseKey)

        const { data: categorias } = await client
          .from('waterplast-categorias')
          .select('slug')
          .eq('estado', true)

        if (categorias) {
          categorias.forEach((cat: any) => {
            urls.push({ loc: `/waterplast/${cat.slug}`, priority: 0.7 })
          })
        }

        const { data: productos } = await client
          .from('waterplast-productos')
          .select('slug, categoria:categoria_id (slug)')
          .eq('estado', true)

        if (productos) {
          productos.forEach((prod: any) => {
            if (prod.categoria?.slug) {
              urls.push({
                loc: `/waterplast/${prod.categoria.slug}/${prod.slug}`,
                priority: 0.6
              })
            }
          })
        }

        const { data: blogs } = await client.from('blog').select('slug')

        if (blogs) {
          blogs.forEach((blog: any) => {
            urls.push({ loc: `/blog/${blog.slug}`, priority: 0.6 })
          })
        }
      } catch (error) {
        console.error('Error generating sitemap:', error)
      }

      return urls
    }
  },

  nitro: {
    preset: 'vercel-static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/waterplast', '/blog', '/sitemap.xml'],
      ignore: ['/admin']
    },
    routeRules: {
      '/**': { cache: { maxAge: 60 * 60 * 24 * 7 } }
    }
  },

  hooks: {
    async 'nitro:config'(nitroConfig: any) {
      const supabaseUrl = process.env.SUPABASE_URL
      const supabaseKey = process.env.SUPABASE_KEY

      if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Supabase credentials required for prerendering dynamic routes')
        return
      }

      try {
        const client = createClient(supabaseUrl, supabaseKey)

        const { data: categorias } = await client
          .from('waterplast-categorias')
          .select('slug')
          .eq('estado', true)

        if (categorias) {
          categorias.forEach((cat: any) => {
            nitroConfig.prerender.routes.push(`/waterplast/${cat.slug}`)
          })
        }

        const { data: productos } = await client
          .from('waterplast-productos')
          .select('slug, categoria:categoria_id (slug)')
          .eq('estado', true)

        if (productos) {
          productos.forEach((prod: any) => {
            if (prod.categoria?.slug) {
              nitroConfig.prerender.routes.push(
                `/waterplast/${prod.categoria.slug}/${prod.slug}`
              )
            }
          })
        }

        const { data: blogs } = await client.from('blog').select('slug')

        if (blogs) {
          blogs.forEach((blog: any) => {
            nitroConfig.prerender.routes.push(`/blog/${blog.slug}`)
          })
        }
      } catch (error) {
        console.error('❌ Error prerendering routes:', error)
      }
    }
  },

  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800]
    }
  },

  icon: {
    provider: 'iconify',
    collections: ['material-symbols']
  },

  image: {
    formats: ['webp', 'original'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    densities: [1, 2],
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: '75',
          fit: 'cover'
        }
      }
    }
  },

  supabase: {
    redirect: false
  },
  experimental: {
    payloadExtraction: false
  }
})