export default defineEventHandler((event) => {
  const path = event.node.req.url || ''

  if (path.includes('/storage/v1/object/public/')) {
    setHeader(event, 'Cache-Control', 'public, max-age=2592000, immutable')
    setHeader(event, 'CDN-Cache-Control', 'max-age=2592000')
  }

  if (/\.(webp|svg|png|jpg|jpeg|gif|woff2|woff|ttf)$/i.test(path)) {
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    setHeader(event, 'CDN-Cache-Control', 'max-age=31536000')
  }

  if (path.endsWith('.html') || path === '/') {
    setHeader(event, 'Cache-Control', 'public, max-age=0, must-revalidate')
  }

  if (/\.(js|css)$/i.test(path)) {
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  }
})
