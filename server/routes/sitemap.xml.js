import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event)
    const baseUrl = 'https://unikegroup.com.ar'

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Static routes
    const staticRoutes = [
      { path: '/', priority: 1.0, changefreq: 'weekly' },
      { path: '/waterplast', priority: 0.9, changefreq: 'weekly' },
      { path: '/blog', priority: 0.8, changefreq: 'weekly' }
    ]

    staticRoutes.forEach(route => {
      xml += `  <url>\n`
      xml += `    <loc>${baseUrl}${route.path}</loc>\n`
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`
      xml += `    <priority>${route.priority}</priority>\n`
      xml += `  </url>\n`
    })

    // Dynamic categories
    const { data: categorias } = await client
      .from('waterplast-categorias')
      .select('slug, updated_at')
      .eq('estado', true)

    if (categorias) {
      categorias.forEach(cat => {
        xml += `  <url>\n`
        xml += `    <loc>${baseUrl}/waterplast/${cat.slug}</loc>\n`
        if (cat.updated_at) {
          xml += `    <lastmod>${new Date(cat.updated_at).toISOString().split('T')[0]}</lastmod>\n`
        }
        xml += `    <changefreq>monthly</changefreq>\n`
        xml += `    <priority>0.7</priority>\n`
        xml += `  </url>\n`
      })
    }

    // Dynamic products
    const { data: productos } = await client
      .from('waterplast-productos')
      .select('slug, updated_at, categoria:categoria_id (slug)')
      .eq('estado', true)

    if (productos) {
      productos.forEach(prod => {
        if (prod.categoria?.slug) {
          xml += `  <url>\n`
          xml += `    <loc>${baseUrl}/waterplast/${prod.categoria.slug}/${prod.slug}</loc>\n`
          if (prod.updated_at) {
            xml += `    <lastmod>${new Date(prod.updated_at).toISOString().split('T')[0]}</lastmod>\n`
          }
          xml += `    <changefreq>weekly</changefreq>\n`
          xml += `    <priority>0.6</priority>\n`
          xml += `  </url>\n`
        }
      })
    }

    // Dynamic blog posts
    const { data: blogs } = await client
      .from('blog')
      .select('slug, fecha')

    if (blogs) {
      blogs.forEach(blog => {
        xml += `  <url>\n`
        xml += `    <loc>${baseUrl}/blog/${blog.slug}</loc>\n`
        if (blog.fecha) {
          xml += `    <lastmod>${new Date(blog.fecha).toISOString().split('T')[0]}</lastmod>\n`
        }
        xml += `    <changefreq>weekly</changefreq>\n`
        xml += `    <priority>0.6</priority>\n`
        xml += `  </url>\n`
      })
    }

    xml += '</urlset>'

    setHeader(event, 'Content-Type', 'application/xml')
    return xml
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
  }
})
