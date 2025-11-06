export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Path is required'
    })
  }

  try {
    const supabaseUrl = 'https://fxytgajevhfuzwlyaorb.supabase.co'
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${path}`

    // Fetch the image from Supabase
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Failed to fetch image: ${response.statusText}`
      })
    }

    // Set cache headers for 7 days
    setHeader(event, 'Cache-Control', 'public, max-age=604800, immutable')
    setHeader(event, 'Content-Type', response.headers.get('content-type') || 'application/octet-stream')

    const buffer = await response.arrayBuffer()
    return new Response(buffer)
  } catch (error) {
    console.error('Error proxying image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to proxy image'
    })
  }
})
