export default defineEventHandler((event) => {
  const path = event.node.req.url || '';

  if (path.includes('/api/') || path.includes('/_nuxt/')) {
    setHeader(event, 'Content-Encoding', 'gzip');
    setHeader(event, 'Transfer-Encoding', 'chunked');
  }

  const originalSend = event.node.res.end;

  if (process.env.NODE_ENV === 'production') {
    event.node.res.end = function (chunk, encoding) {
      if (typeof chunk === 'string' && event.node.res.getHeader('content-type')?.includes('application/json')) {
        try {
          chunk = JSON.stringify(JSON.parse(chunk));
        } catch {
        }
      }
      originalSend.call(this, chunk, encoding);
    };
  }
});
