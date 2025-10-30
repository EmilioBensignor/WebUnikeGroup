// https://nuxt.com/docs/api/configuration/nuxt-config
import { createClient } from '@supabase/supabase-js'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/seo', '@nuxtjs/supabase'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
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
        { rel: 'apple-touch-icon', href: '/images/Unike-Group-Logo.svg' },
        { rel: 'prefetch', as: 'image', href: '/images/logos/Logo-Waterplast-Blanco.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fxytgajevhfuzwlyaorb.supabase.co' },
        { rel: 'dns-prefetch', href: 'https://maps.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://maps.gstatic.com' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
      bucketUrl: (process.env.SUPABASE_URL || 'https://fxytgajevhfuzwlyaorb.supabase.co') + '/storage/v1/object/public',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://unikegroup.com.ar'
    },
  },
  site: {
    url: 'https://unikegroup.com.ar',
    name: 'Waterplast - Unike Group',
    description: 'En Unike Group desarrollamos soluciones innovadoras para el almacenamiento y tratamiento del agua en Argentina. Nuestros tanques Waterplast garantizan calidad, durabilidad y protección antibacteriana. Descubrí nuestra red de distribuidores y asesorate con nuestros expertos en soluciones hídricas sustentables.',
    defaultLocale: 'es'
  },
  seo: {
    fallbackTitle: false,
    redirectToCanonicalSiteUrl: false
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/waterplast',
        '/blog',
        '/sitemap.xml'
      ]
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
        console.warn('⚠️  SUPABASE_URL y SUPABASE_KEY son requeridos para prerender')
        return
      }

      try {
        const client = createClient(supabaseUrl, supabaseKey)

        const { data: categorias } = await client
          .from('waterplast-categorias')
          .select('slug')
          .eq('estado', true)

        if (categorias && Array.isArray(categorias)) {
          categorias.forEach((cat: any) => {
            nitroConfig.prerender.routes.push(`/waterplast/${cat.slug}`)
          })
        }

        const { data: productos } = await client
          .from('waterplast-productos')
          .select('slug, categoria:categoria_id (slug)')
          .eq('estado', true)

        if (productos && Array.isArray(productos)) {
          productos.forEach((prod: any) => {
            if (prod.categoria?.slug) {
              nitroConfig.prerender.routes.push(`/waterplast/${prod.categoria.slug}/${prod.slug}`)
            }
          })
        }

        const { data: blogs } = await client
          .from('blogs')
          .select('slug')
          .eq('estado', true)

        if (blogs && Array.isArray(blogs)) {
          blogs.forEach((blog: any) => {
            nitroConfig.prerender.routes.push(`/blog/${blog.slug}`)
          })
        }

      } catch (error: any) {
        console.error('❌ Error al cargar rutas dinámicas:', error?.message || 'Error desconocido')
      }
    }
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
  image: {
    formats: ['webp', 'original'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
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
    redirect: false,
  },
})