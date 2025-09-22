export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }

  try {
    const supabase = useSupabaseClient()

    // Get product data
    const { data: producto, error } = await supabase
      .from('waterplast-productos')
      .select('archivo_html, slug, nombre')
      .eq('slug', slug)
      .single()

    if (error || !producto || !producto.archivo_html) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product or 3D viewer not found'
      })
    }

    // Fetch HTML content from Supabase Storage
    const config = useRuntimeConfig()
    const htmlUrl = `${config.public.supabase.url}/storage/v1/object/public/waterplast-productos/${producto.archivo_html}`

    const htmlResponse = await $fetch(htmlUrl, {
      method: 'GET'
    })

    // Set proper headers for HTML content
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    setHeader(event, 'X-Frame-Options', 'SAMEORIGIN')

    return htmlResponse

  } catch (error) {
    console.error('Error serving 3D viewer:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error loading 3D viewer'
    })
  }
})