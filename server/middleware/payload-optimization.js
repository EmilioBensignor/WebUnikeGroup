export default defineEventHandler((event) => {
  const bypass = getHeader(event, 'x-ci-bypass')
  if (bypass === '1') {
    return
  }

  const path = event.node.req.url || '';
})
