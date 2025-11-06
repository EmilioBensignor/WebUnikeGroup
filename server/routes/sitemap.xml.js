import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const baseUrl = 'https://unikegroup.com.ar'
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  try {
    // URLs estáticas
    const staticRoutes = [
      '/',
      '/waterplast',
      '/blog',
    ]

    for (const route of staticRoutes) {
      xml += `  <url>\n`
      xml += `    <loc>${baseUrl}${route}</loc>\n`
      xml += `    <changefreq>weekly</changefreq>\n`
      xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`
      xml += `  </url>\n`
    }

    // Categorías
    const { data: categorias, error: categoriasError } = await client
      .from('waterplast-categorias')
      .select('slug, actualizado')
      .eq('estado', true)

    if (categorias && !categoriasError) {
      categorias.forEach((cat) => {
        const lastmod = cat.actualizado ? new Date(cat.actualizado).toISOString().split('T')[0] : ''
        xml += `  <url>\n`
        xml += `    <loc>${baseUrl}/waterplast/${cat.slug}</loc>\n`
        if (lastmod) xml += `    <lastmod>${lastmod}</lastmod>\n`
        xml += `    <changefreq>monthly</changefreq>\n`
        xml += `    <priority>0.7</priority>\n`
        xml += `  </url>\n`
      })
    }

    // Productos
    const { data: productos, error: productosError } = await client
      .from('waterplast-productos')
      .select('slug, actualizado, categoria:categoria_id (slug)')
      .eq('estado', true)

    if (productos && !productosError) {
      productos.forEach((prod) => {
        if (prod.categoria?.slug) {
          const lastmod = prod.actualizado ? new Date(prod.actualizado).toISOString().split('T')[0] : ''
          xml += `  <url>\n`
          xml += `    <loc>${baseUrl}/waterplast/${prod.categoria.slug}/${prod.slug}</loc>\n`
          if (lastmod) xml += `    <lastmod>${lastmod}</lastmod>\n`
          xml += `    <changefreq>weekly</changefreq>\n`
          xml += `    <priority>0.6</priority>\n`
          xml += `  </url>\n`
        }
      })
    }

    // Blogs
    const { data: blogs, error: blogsError } = await client
      .from('blogs')
      .select('slug, fecha')
      .eq('estado', true)

    if (blogs && !blogsError) {
      blogs.forEach((blog) => {
        const lastmod = blog.fecha ? new Date(blog.fecha).toISOString().split('T')[0] : ''
        xml += `  <url>\n`
        xml += `    <loc>${baseUrl}/blog/${blog.slug}</loc>\n`
        if (lastmod) xml += `    <lastmod>${lastmod}</lastmod>\n`
        xml += `    <changefreq>weekly</changefreq>\n`
        xml += `    <priority>0.6</priority>\n`
        xml += `  </url>\n`
      })
    }

  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  xml += '</urlset>'

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
