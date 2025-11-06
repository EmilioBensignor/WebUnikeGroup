export const useImageProxy = () => {
  const buildProxyUrl = (imagePath) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath

    return `/image-proxy/${imagePath}`
  }

  return {
    buildProxyUrl
  }
}
