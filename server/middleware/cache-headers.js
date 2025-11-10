export default defineEventHandler((event) => {
  const path = event.node.req.url || ''

  if (path.startsWith('/_nuxt/')) return

  if (path.includes('/storage/v1/object/public/')) {
    setHeader(event, 'Cache-Control', 'public, max-age=5184000, immutable')
    setHeader(event, 'CDN-Cache-Control', 'max-age=5184000')
  }

  if (/\.(webp|svg|png|jpg|jpeg|gif|woff2|woff|ttf|eot)$/i.test(path)) {
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    setHeader(event, 'CDN-Cache-Control', 'max-age=31536000')
    if (!event.node.res.getHeader('etag')) {
      setHeader(event, 'ETag', `"${Date.now()}"`)
    }
  }

  if (path.endsWith('.html') || path === '/') {
    setHeader(event, 'Cache-Control', 'public, max-age=3600, must-revalidate')
    setHeader(event, 'Pragma', 'no-cache')
  }

  if (/\.(js|css)$/i.test(path)) {
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    setHeader(event, 'CDN-Cache-Control', 'max-age=31536000')
  }
})
