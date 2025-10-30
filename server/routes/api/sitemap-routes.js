export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  try {
    const { data: categorias, error: categoriasError } = await client
      .from('waterplast-categorias')
      .select('slug')
      .eq('estado', true)

    if (categoriasError) throw categoriasError

    const { data: productos, error: productosError } = await client
      .from('waterplast-productos')
      .select(`
        slug,
        categoria:categoria_id (slug)
      `)
      .eq('estado', true)

    if (productosError) throw productosError

    const { data: blogs, error: blogsError } = await client
      .from('blogs')
      .select('slug')
      .eq('estado', true)

    if (blogsError) throw blogsError

    const routes = [
      '/',
      '/waterplast',
      '/blog',
    ]

    if (categorias && categorias.length > 0) {
      categorias.forEach(cat => {
        routes.push(`/waterplast/${cat.slug}`)
      })
    }

    if (productos && productos.length > 0) {
      productos.forEach(prod => {
        if (prod.categoria && prod.categoria.slug) {
          routes.push(`/waterplast/${prod.categoria.slug}/${prod.slug}`)
        }
      })
    }

    if (blogs && blogs.length > 0) {
      blogs.forEach(blog => {
        routes.push(`/blog/${blog.slug}`)
      })
    }

    return {
      success: true,
      count: routes.length,
      routes
    }
  } catch (error) {
    console.error('Error fetching routes for sitemap:', error)
    return {
      success: false,
      error: error.message,
      routes: []
    }
  }
})
