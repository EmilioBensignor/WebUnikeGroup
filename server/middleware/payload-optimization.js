export default defineEventHandler((event) => {
  const path = event.node.req.url || ''
  const bypass = getHeader(event, 'x-ci-bypass')

  if (path.startsWith('/_nuxt/')) return

  if (bypass === '1') return
})
